const express = require("express");
const router = express.Router();
const humanCategoryController = require("../controller/humanCategoryController");

/**
 * @swagger
 * tags:
 *   name: HumanCategory
 *   description: HumanCategory management
 */

/**
 * @swagger
 * /api/human-categories:
 *   post:
 *     tags: [HumanCategory]
 *     summary: Create a new HumanCategory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_age:
 *                 type: integer
 *               finish_age:
 *                 type: integer
 *               gender_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: HumanCategory created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/human-categories", humanCategoryController.createHumanCategory);

/**
 * @swagger
 * /api/human-categories:
 *   get:
 *     tags: [HumanCategory]
 *     summary: Get all HumanCategorys
 *     responses:
 *       200:
 *         description: List of HumanCategorys
 *       500:
 *         description: Server error
 */
router.get("/human-categories", humanCategoryController.getHumanCategorys);

/**
 * @swagger
 * /api/human-categories/search:
 *   get:
 *     tags: [HumanCategory]
 *     summary: Search HumanCategorys
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching HumanCategory list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/human-categories/search", humanCategoryController.searchHumanCategorys);

/**
 * @swagger
 * /api/human-categories/{id}:
 *   get:
 *     tags: [HumanCategory]
 *     summary: Get HumanCategory by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: HumanCategory ID
 *     responses:
 *       200:
 *         description: HumanCategory details
 *       404:
 *         description: HumanCategory not found
 *       500:
 *         description: Server error
 */
router.get("/human-categories/:id", humanCategoryController.getHumanCategoryById);

/**
 * @swagger
 * /api/human-categories/{id}:
 *   put:
 *     tags: [HumanCategory]
 *     summary: Update HumanCategory by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: HumanCategory ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_age:
 *                 type: integer
 *               finish_age:
 *                 type: integer
 *               gender_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: HumanCategory updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: HumanCategory not found
 *       500:
 *         description: Server error
 */
router.put("/human-categories/:id", humanCategoryController.updateHumanCategory);

/**
 * @swagger
 * /api/human-categories/{id}:
 *   delete:
 *     tags: [HumanCategory]
 *     summary: Delete HumanCategory by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: HumanCategory ID
 *     responses:
 *       200:
 *         description: HumanCategory deleted
 *       404:
 *         description: HumanCategory not found
 *       500:
 *         description: Server error
 */
router.delete("/human-categories/:id", humanCategoryController.deleteHumanCategory);

module.exports = router;
