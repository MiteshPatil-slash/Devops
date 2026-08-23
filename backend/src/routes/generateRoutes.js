const express = require('express');
const router = express.Router();
const generateController = require('../controllers/generateController');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

router.post('/', generateController.generate);
router.get('/', generateController.listProjects);
router.get('/:id', generateController.getProject);
router.delete('/:id', generateController.deleteProject);

module.exports = router;
