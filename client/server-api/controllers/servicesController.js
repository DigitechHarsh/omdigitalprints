const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getServices = async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status !== undefined) {
      where.status = status === 'true';
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { projects: true } }
      }
    });
    return res.json(services);
  } catch (error) {
    console.error('getServices error:', error);
    return res.status(500).json({ error: 'Failed to fetch services' });
  }
};

const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        projects: {
          where: { status: true },
          include: { gallery: true }
        }
      }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    return res.json(service);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch service detail' });
  }
};

const createService = async (req, res) => {
  try {
    const { name, slug, shortDesc, fullDesc, status } = req.body;
    let icon = req.body.icon;
    if (req.file && req.file.path) {
      icon = req.file.path;
    }

    if (!name || !slug) {
      return res.status(400).json({ error: 'Service name and slug are required' });
    }

    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({ error: 'Service slug already exists' });
    }

    const newService = await prisma.service.create({
      data: {
        name,
        slug,
        icon: icon || '/assets/service-default.png',
        shortDesc,
        fullDesc,
        status: status === 'true' || status === true
      }
    });

    return res.status(201).json(newService);
  } catch (error) {
    console.error('createService error:', error);
    return res.status(500).json({ error: 'Failed to create service' });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, shortDesc, fullDesc, status } = req.body;
    
    const data = {};
    if (name) data.name = name;
    if (slug) data.slug = slug;
    if (shortDesc !== undefined) data.shortDesc = shortDesc;
    if (fullDesc !== undefined) data.fullDesc = fullDesc;
    if (status !== undefined) data.status = status === 'true' || status === true;
    
    if (req.file && req.file.path) {
      data.icon = req.file.path;
    } else if (req.body.icon) {
      data.icon = req.body.icon;
    }

    const updated = await prisma.service.update({
      where: { id: parseInt(id) },
      data
    });

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update service' });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id: parseInt(id) } });
    return res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete service' });
  }
};

module.exports = {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
};
