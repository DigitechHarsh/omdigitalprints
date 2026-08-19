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
    let bgImage = req.body.bgImage;

    if (req.files && req.files.image) {
      image = req.files.image[0].path; // Cloudinary URL
    }
    if (req.files && req.files.bgImage) {
      bgImage = req.files.bgImage[0].path; // Cloudinary URL
    }

    if (!headline) {
      return res.status(400).json({ error: 'Headline is required' });
    }

    const newSlide = await prisma.slide.create({
      data: {
        image: image || '/assets/slide-default.png',
        bgImage: bgImage || null,
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

    if (req.files && req.files.image) {
      data.image = req.files.image[0].path;
    } else if (req.body.image) {
      data.image = req.body.image;
    }

    if (req.files && req.files.bgImage) {
      data.bgImage = req.files.bgImage[0].path;
    } else if (req.body.bgImage !== undefined) {
      data.bgImage = req.body.bgImage;
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
