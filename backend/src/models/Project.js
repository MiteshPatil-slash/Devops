const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    prompt: { type: String, required: true },

    status: {
      type: String,
      enum: ['generating', 'building', 'running', 'failed', 'stopped'],
      default: 'generating',
    },
    errorMessage: { type: String, default: null },

    // Where the generated files live on disk
    projectDir: { type: String, default: '' },

    // Docker details
    dockerImageTag: { type: String, default: null },
    containerId: { type: String, default: null },
    hostPort: { type: Number, default: null },
    previewUrl: { type: String, default: null },

    versions: [
      {
        versionLabel: String,
        prompt: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
