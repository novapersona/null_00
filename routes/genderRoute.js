const express = require("express");
const router = express.Router();
const genderController = require("../controller/genderController");

/**
 * @swagger
 * tags:
 *   name: Gender
 *   description: Gender management
 */

/**
 * @swagger
 * /api/genders:
 *   post:
 *     tags: [Gender]
 *     summary: Create a new Gender
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gender created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/genders", genderController.createGender);

/**
 * @swagger
 * /api/genders:
 *   get:
 *     tags: [Gender]
 *     summary: Get all Genders
 *     responses:
 *       200:
 *         description: List of Genders
 *       500:
 *         description: Server error
 */
router.get("/genders", genderController.getGenders);

/**
 * @swagger
 * /api/genders/search:
 *   get:
 *     tags: [Gender]
 *     summary: Search Genders
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching Gender list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/genders/search", genderController.searchGenders);

/**
 * @swagger
 * /api/genders/{id}:
 *   get:
 *     tags: [Gender]
 *     summary: Get Gender by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Gender ID
 *     responses:
 *       200:
 *         description: Gender details
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.get("/genders/:id", genderController.getGenderById);

/**
 * @swagger
 * /api/genders/{id}:
 *   put:
 *     tags: [Gender]
 *     summary: Update Gender by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Gender ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gender updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.put("/genders/:id", genderController.updateGender);

/**
 * @swagger
 * /api/genders/{id}:
 *   delete:
 *     tags: [Gender]
 *     summary: Delete Gender by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Gender ID
 *     responses:
 *       200:
 *         description: Gender deleted
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.delete("/genders/:id", genderController.deleteGender);

module.exports = router;
