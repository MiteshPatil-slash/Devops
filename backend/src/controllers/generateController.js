const crypto = require('crypto');
const Project = require('../models/Project');
const { generateWebsite } = require('../services/aiAgentService');
const {
  writeProjectFiles,
  buildImage,
  runContainer,
  stopAndRemoveContainer,
  removeProjectFiles,
} = require('../services/dockerService');

// POST /api/generate
// Body: { prompt: string }
async function generate(req, res) {
  const { prompt } = req.body;
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ message: 'A prompt is required' });
  }

  const projectId = crypto.randomUUID();
  let project;

  try {
    // 1. Create a tracking record immediately so the frontend can poll status.
    project = await Project.create({
      owner: req.user._id,
      name: 'Generating…',
      prompt,
      status: 'generating',
      projectDir: '',
    });

    // 2. Call the AI agent to generate real website files.
    const { appName, files } = await generateWebsite(prompt);

    // 3. Write files + Dockerfile to an isolated directory.
    const projectDir = await writeProjectFiles(projectId, files);
    project.name = appName;
    project.projectDir = projectDir;
    project.status = 'building';
    await project.save();

    // 4. Build the Docker image.
    const imageTag = `ai-deploy-${projectId}`.toLowerCase();
    await buildImage(projectDir, imageTag);
    project.dockerImageTag = imageTag;
    await project.save();

    // 5. Run the container with a dynamically assigned port.
    const containerName = `ai-deploy-${projectId}`;
    const { containerId, hostPort } = await runContainer(imageTag, containerName);

    project.containerId = containerId;
    project.hostPort = hostPort;
    project.previewUrl = `http://localhost:${hostPort}`;
    project.status = 'running';
    project.versions.push({ versionLabel: 'v1.0', prompt });
    await project.save();

    res.status(201).json({ message: 'Application generated and running', project });
  } catch (err) {
    console.error('[generate] pipeline failed:', err);

    if (project) {
      project.status = 'failed';
      project.errorMessage = err.message;
      await project.save().catch(() => {});

      // Best-effort cleanup of anything partially created.
      if (project.containerId) await stopAndRemoveContainer(project.containerId);
      if (project.projectDir) await removeProjectFiles(project.projectDir);
    }

    res.status(500).json({
      message: 'Generation failed',
      error: err.message,
      projectId: project?._id,
    });
  }
}

// GET /api/generate/:id
async function getProject(req, res) {
  const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json({ project });
}

// GET /api/generate
async function listProjects(req, res) {
  const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json({ projects });
}

// DELETE /api/generate/:id
async function deleteProject(req, res) {
  const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });
  if (!project) return res.status(404).json({ message: 'Project not found' });

  await stopAndRemoveContainer(project.containerId);
  await removeProjectFiles(project.projectDir);
  await project.deleteOne();

  res.json({ message: 'Project removed' });
}

module.exports = { generate, getProject, listProjects, deleteProject };
