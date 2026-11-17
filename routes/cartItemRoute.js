const express = require("express");
const router = express.Router();
const cartItemController = require("../controller/cartItemController");

/**
 * @swagger
 * tags:
 *   name: CartItem
 *   description: CartItem management
 */

/**
 * @swagger
 * /api/cart-items:
 *   post:
 *     tags: [CartItem]
 *     summary: Create a new CartItem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *               cart_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: CartItem created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/cart-items", cartItemController.createCartItem);

/**
 * @swagger
 * /api/cart-items:
 *   get:
 *     tags: [CartItem]
 *     summary: Get all CartItems
 *     responses:
 *       200:
 *         description: List of CartItems
 *       500:
 *         description: Server error
 */
router.get("/cart-items", cartItemController.getCartItems);

/**
 * @swagger
 * /api/cart-items/search:
 *   get:
 *     tags: [CartItem]
 *     summary: Search CartItems
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching CartItem list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/cart-items/search", cartItemController.searchCartItems);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   get:
 *     tags: [CartItem]
 *     summary: Get CartItem by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: CartItem ID
 *     responses:
 *       200:
 *         description: CartItem details
 *       404:
 *         description: CartItem not found
 *       500:
 *         description: Server error
 */
router.get("/cart-items/:id", cartItemController.getCartItemById);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   put:
 *     tags: [CartItem]
 *     summary: Update CartItem by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: CartItem ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *               cart_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: CartItem updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: CartItem not found
 *       500:
 *         description: Server error
 */
router.put("/cart-items/:id", cartItemController.updateCartItem);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   delete:
 *     tags: [CartItem]
 *     summary: Delete CartItem by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: CartItem ID
 *     responses:
 *       200:
 *         description: CartItem deleted
 *       404:
 *         description: CartItem not found
 *       500:
 *         description: Server error
 */
router.delete("/cart-items/:id", cartItemController.deleteCartItem);

module.exports = router;
