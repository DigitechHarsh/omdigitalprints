const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createLead = async (req, res) => {
  try {
    const { name, phone, email, serviceId, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone number are required' });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email,
        serviceId: serviceId ? parseInt(serviceId) : null,
        message,
        status: 'New'
      }
    });

    return res.status(201).json({ message: 'Inquiry submitted successfully!', lead });
  } catch (error) {
    console.error('createLead error:', error);
    return res.status(500).json({ error: 'Failed to submit lead inquiry' });
  }
};

const getLeads = async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } }
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return res.json(leads);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch leads' });
  }
};

const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['New', 'Contacted', 'Closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid lead status' });
    }

    const updated = await prisma.lead.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update lead status' });
  }
};

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.lead.delete({ where: { id: parseInt(id) } });
    return res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete lead' });
  }
};

module.exports = {
  createLead,
  getLeads,
  updateLeadStatus,
  deleteLead
};
