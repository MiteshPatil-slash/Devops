const fs = require('fs/promises');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const net = require('net');

const execAsync = util.promisify(exec);

const APPS_ROOT = path.resolve(process.env.GENERATED_APPS_DIR || './generated-apps');
const PORT_START = parseInt(process.env.DOCKER_PORT_RANGE_START || '6000', 10);
const PORT_END = parseInt(process.env.DOCKER_PORT_RANGE_END || '6999', 10);

/** Writes the AI-generated files to an isolated project directory. */
async function writeProjectFiles(projectId, files) {
  const projectDir = path.join(APPS_ROOT, projectId);
  await fs.mkdir(projectDir, { recursive: true });

  for (const file of files) {
    const safePath = path.normalize(file.path).replace(/^(\.\.[/\\])+/, ''); // basic path traversal guard
    const fullPath = path.join(projectDir, safePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, file.content, 'utf8');
  }

  // Static site -> serve with nginx. Simple, fast to build, no runtime deps.
  const dockerfile = `FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
`;
  await fs.writeFile(path.join(projectDir, 'Dockerfile'), dockerfile, 'utf8');

  return projectDir;
}

/** Finds a free TCP port in the configured range. */
async function findFreePort() {
  for (let port = PORT_START; port <= PORT_END; port++) {
    // eslint-disable-next-line no-await-in-loop
    const free = await isPortFree(port);
    if (free) return port;
  }
  throw new Error('No free ports available in the configured range');
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '127.0.0.1');
  });
}

/** Builds the Docker image for a generated project. */
async function buildImage(projectDir, imageTag) {
  const { stdout, stderr } = await execAsync(`docker build -t ${imageTag} .`, {
    cwd: projectDir,
    maxBuffer: 1024 * 1024 * 20,
  });
  return { stdout, stderr };
}

/** Runs the built image in a container on a dynamically assigned host port. */
async function runContainer(imageTag, containerName) {
  const hostPort = await findFreePort();
  const { stdout } = await execAsync(
    `docker run -d --name ${containerName} -p ${hostPort}:80 ${imageTag}`
  );
  const containerId = stdout.trim();
  return { containerId, hostPort };
}

/** Stops and removes a container (used on failure or when regenerating). */
async function stopAndRemoveContainer(containerId) {
  if (!containerId) return;
  try {
    await execAsync(`docker rm -f ${containerId}`);
  } catch (err) {
    console.warn('[docker] cleanup warning:', err.message);
  }
}

/** Removes a project's generated files from disk. */
async function removeProjectFiles(projectDir) {
  try {
    await fs.rm(projectDir, { recursive: true, force: true });
  } catch (err) {
    console.warn('[docker] file cleanup warning:', err.message);
  }
}

module.exports = {
  APPS_ROOT,
  writeProjectFiles,
  buildImage,
  runContainer,
  stopAndRemoveContainer,
  removeProjectFiles,
  findFreePort,
};
