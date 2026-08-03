const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProjects = async (req, res) => {
  try {
    const { serviceId, status } = req.query;
    const where = {};
    if (serviceId) where.serviceId = parseInt(serviceId);
    if (status !== undefined) where.status = status === 'true';

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        service: true,
        gallery: true
      }
    });

    return res.json(projects);
  } catch (error) {
    console.error('getProjects error:', error);
    return res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: {
        service: true,
        gallery: true
      }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.json(project);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch project detail' });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, serviceId, description, completedAt, status } = req.body;
    let mainImage = req.body.mainImage;

    const files = req.files || {};
    if (files.mainImage && files.mainImage.length > 0) {
      mainImage = `/uploads/${files.mainImage[0].filename}`;
    }

    if (!title || !serviceId) {
      return res.status(400).json({ error: 'Title and Service ID are required' });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        serviceId: parseInt(serviceId),
        mainImage: mainImage || '/assets/project-default.png',
        description,
        completedAt: completedAt ? new Date(completedAt) : new Date(),
        status: status === 'true' || status === true
      }
    });

    if (files.gallery && files.gallery.length > 0) {
      const galleryData = files.gallery.map(f => ({
        projectId: newProject.id,
        imageUrl: `/uploads/${f.filename}`
      }));
      await prisma.projectImage.createMany({ data: galleryData });
    }

    const result = await prisma.project.findUnique({
      where: { id: newProject.id },
      include: { service: true, gallery: true }
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error('createProject error:', error);
    return res.status(500).json({ error: 'Failed to create project' });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, serviceId, description, completedAt, status } = req.body;

    const data = {};
    if (title) data.title = title;
    if (serviceId) data.serviceId = parseInt(serviceId);
    if (description !== undefined) data.description = description;
    if (completedAt) data.completedAt = new Date(completedAt);
    if (status !== undefined) data.status = status === 'true' || status === true;

    const files = req.files || {};
    if (files.mainImage && files.mainImage.length > 0) {
      data.mainImage = `/uploads/${files.mainImage[0].filename}`;
    }

    const updated = await prisma.project.update({
      where: { id: parseInt(id) },
      data
    });

    if (files.gallery && files.gallery.length > 0) {
      const galleryData = files.gallery.map(f => ({
        projectId: parseInt(id),
        imageUrl: `/uploads/${f.filename}`
      }));
      await prisma.projectImage.createMany({ data: galleryData });
    }

    const result = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: { service: true, gallery: true }
    });

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update project' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id: parseInt(id) } });
    return res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete project' });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
