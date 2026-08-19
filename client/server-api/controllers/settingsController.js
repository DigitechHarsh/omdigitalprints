const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSettings = async (req, res) => {
  try {
    const settings = await prisma.setting.findMany();
    // Convert array of {key, value} to a flat object
    const config = {};
    settings.forEach((s) => {
      config[s.key] = s.value;
    });
    return res.json(config);
  } catch (error) {
    console.error('getSettings error:', error);
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
};

const updateSettings = async (req, res) => {
  try {
    const payload = req.body;
    
    // Upsert each key in the payload
    for (const [key, value] of Object.entries(payload)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    return res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('updateSettings error:', error);
    return res.status(500).json({ error: 'Failed to update settings' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
