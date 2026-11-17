const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /api/carts:
 *   post:
 *     tags: [Cart]
 *     summary: Create a new Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               createdAt:
 *                 type: string
 *               fineshedAt:
 *                 type: string
 *               status_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/carts", cartController.createCart);

/**
 * @swagger
 * /api/carts:
 *   get:
 *     tags: [Cart]
 *     summary: Get all Carts
 *     responses:
 *       200:
 *         description: List of Carts
 *       500:
 *         description: Server error
 */
router.get("/carts", cartController.getCarts);

/**
 * @swagger
 * /api/carts/search:
 *   get:
 *     tags: [Cart]
 *     summary: Search Carts
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching Cart list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/carts/search", cartController.searchCarts);

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     tags: [Cart]
 *     summary: Get Cart by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Cart details
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.get("/carts/:id", cartController.getCartById);

/**
 * @swagger
 * /api/carts/{id}:
 *   put:
 *     tags: [Cart]
 *     summary: Update Cart by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               createdAt:
 *                 type: string
 *               fineshedAt:
 *                 type: string
 *               status_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.put("/carts/:id", cartController.updateCart);

/**
 * @swagger
 * /api/carts/{id}:
 *   delete:
 *     tags: [Cart]
 *     summary: Delete Cart by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Cart deleted
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.delete("/carts/:id", cartController.deleteCart);

module.exports = router;
