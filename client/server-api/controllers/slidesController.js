const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSlides = async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status !== undefined) where.status = status === 'true';

    const slides = await prisma.slide.findMany({
      where,
      orderBy: { order: 'asc' }
    });
    return res.json(slides);
  } catch (error) {
    console.error('getSlides error:', error);
    return res.status(500).json({ error: 'Failed to fetch slides' });
  }
};

const createSlide = async (req, res) => {
  try {
    const { headline, subtext, btnText, btnLink, order, status } = req.body;
    let image = req.body.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (!headline) {
      return res.status(400).json({ error: 'Headline is required' });
    }

    const newSlide = await prisma.slide.create({
      data: {
        image: image || '/assets/slide-default.png',
        headline,
        subtext,
        btnText: btnText || 'Explore Services',
        btnLink: btnLink || '/services',
        order: order ? parseInt(order) : 0,
        status: status === 'true' || status === true
      }
    });

    return res.status(201).json(newSlide);
  } catch (error) {
    console.error('createSlide error:', error);
    return res.status(500).json({ error: 'Failed to create slide' });
  }
};

const updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const { headline, subtext, btnText, btnLink, order, status } = req.body;

    const data = {};
    if (headline) data.headline = headline;
    if (subtext !== undefined) data.subtext = subtext;
    if (btnText !== undefined) data.btnText = btnText;
    if (btnLink !== undefined) data.btnLink = btnLink;
    if (order !== undefined) data.order = parseInt(order);
    if (status !== undefined) data.status = status === 'true' || status === true;

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      data.image = req.body.image;
    }

    const updated = await prisma.slide.update({
      where: { id: parseInt(id) },
      data
    });

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update slide' });
  }
};

const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.slide.delete({ where: { id: parseInt(id) } });
    return res.json({ message: 'Slide deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete slide' });
  }
};

module.exports = {
  getSlides,
  createSlide,
  updateSlide,
  deleteSlide
};
