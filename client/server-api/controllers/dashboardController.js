const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await prisma.project.count();
    const totalServices = await prisma.service.count();
    const totalLeads = await prisma.lead.count();
    const newLeads = await prisma.lead.count({ where: { status: 'New' } });

    const recentLeads = await prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    const recentProjects = await prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { service: true }
    });

    // Lead growth breakdown for chart
    const leadsByStatus = [
      { name: 'New', count: newLeads },
      { name: 'Contacted', count: await prisma.lead.count({ where: { status: 'Contacted' } }) },
      { name: 'Closed', count: await prisma.lead.count({ where: { status: 'Closed' } }) }
    ];

    return res.json({
      totalProjects,
      totalServices,
      totalLeads,
      newLeads,
      recentLeads,
      recentProjects,
      leadsByStatus
    });
  } catch (error) {
    console.error('getDashboardStats error:', error);
    return res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
};

module.exports = { getDashboardStats };
