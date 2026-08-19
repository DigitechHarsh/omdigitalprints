const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const services = require('../controllers/servicesController');
const projects = require('../controllers/projectsController');
const slides = require('../controllers/slidesController');
const leads = require('../controllers/leadsController');
const dashboard = require('../controllers/dashboardController');
const settings = require('../controllers/settingsController');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Auth
router.post('/auth/login', auth.login);
router.get('/auth/me', authenticateToken, auth.me);
router.post('/auth/logout', auth.logout);

// Public Routes
router.get('/services', services.getServices);
router.get('/services/:slug', services.getServiceBySlug);
router.get('/projects', projects.getProjects);
router.get('/projects/:id', projects.getProjectById);
router.get('/slides', slides.getSlides);
router.post('/leads', leads.createLead);
router.get('/settings', settings.getSettings);

// Admin Routes (JWT Protected)
router.post('/admin/services', authenticateToken, upload.single('icon'), services.createService);
router.put('/admin/services/:id', authenticateToken, upload.single('icon'), services.updateService);
router.delete('/admin/services/:id', authenticateToken, services.deleteService);

router.post(
  '/admin/projects',
  authenticateToken,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
  ]),
  projects.createProject
);
router.put(
  '/admin/projects/:id',
  authenticateToken,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
  ]),
  projects.updateProject
);
router.delete('/admin/projects/:id', authenticateToken, projects.deleteProject);

router.post('/admin/slides', authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'bgImage', maxCount: 1 }]), slides.createSlide);
router.put('/admin/slides/:id', authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'bgImage', maxCount: 1 }]), slides.updateSlide);
router.delete('/admin/slides/:id', authenticateToken, slides.deleteSlide);

router.get('/admin/leads', authenticateToken, leads.getLeads);
router.put('/admin/leads/:id', authenticateToken, leads.updateLeadStatus);
router.delete('/admin/leads/:id', authenticateToken, leads.deleteLead);

router.get('/admin/dashboard/stats', authenticateToken, dashboard.getDashboardStats);

router.put('/admin/settings', authenticateToken, settings.updateSettings);

module.exports = router;
