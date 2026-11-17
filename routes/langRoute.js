const express = require("express");
const router = express.Router();
const langController = require("../controller/langController");

/**
 * @swagger
 * tags:
 *   name: Lang
 *   description: Lang management
 */

/**
 * @swagger
 * /api/langs:
 *   post:
 *     tags: [Lang]
 *     summary: Create a new Lang
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
 *         description: Lang created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/langs", langController.createLang);

/**
 * @swagger
 * /api/langs:
 *   get:
 *     tags: [Lang]
 *     summary: Get all Langs
 *     responses:
 *       200:
 *         description: List of Langs
 *       500:
 *         description: Server error
 */
router.get("/langs", langController.getLangs);

/**
 * @swagger
 * /api/langs/search:
 *   get:
 *     tags: [Lang]
 *     summary: Search Langs
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching Lang list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/langs/search", langController.searchLangs);

/**
 * @swagger
 * /api/langs/{id}:
 *   get:
 *     tags: [Lang]
 *     summary: Get Lang by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Lang ID
 *     responses:
 *       200:
 *         description: Lang details
 *       404:
 *         description: Lang not found
 *       500:
 *         description: Server error
 */
router.get("/langs/:id", langController.getLangById);

/**
 * @swagger
 * /api/langs/{id}:
 *   put:
 *     tags: [Lang]
 *     summary: Update Lang by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Lang ID
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
 *         description: Lang updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Lang not found
 *       500:
 *         description: Server error
 */
router.put("/langs/:id", langController.updateLang);

/**
 * @swagger
 * /api/langs/{id}:
 *   delete:
 *     tags: [Lang]
 *     summary: Delete Lang by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Lang ID
 *     responses:
 *       200:
 *         description: Lang deleted
 *       404:
 *         description: Lang not found
 *       500:
 *         description: Server error
 */
router.delete("/langs/:id", langController.deleteLang);

module.exports = router;
