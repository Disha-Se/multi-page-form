const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('zipcode').isPostalCode('IN').withMessage('Invalid Zipcode'),
    body('projects').isArray(),
    body('projects.*.name').notEmpty().withMessage('Project name is required'),
    body('projects.*.description').notEmpty().withMessage('Project description is required'),
    // Add conditional validation for school if needed
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {
      name,
      email,
      address1,
      address2,
      city,
      state,
      zipcode,
      isStudying,
      school,
      projects,
    } = req.body;

    try {
      const userForm = await prisma.userData.upsert({
        where: { email },
        update: {
          name,
          address1,
          address2,
          city,
          state,
          zipcode,
          isStudying,
          institution: school,  // fixed typo
          projects: {
            deleteMany: {},
            create: projects,
          },
        },
        create: {
          name,
          email,
          address1,
          address2,
          city,
          state,
          zipcode,
          isStudying,
          institution: school,  // fixed typo
          projects: {
            create: projects,
          },
        },
      });

      res.status(200).json(userForm);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
