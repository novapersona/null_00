const express = require("express");
const router = express.Router();
const deliveryMethodController = require("../controller/deliveryMethodController");

/**
 * @swagger
 * tags:
 *   name: DeliveryMethod
 *   description: DeliveryMethod management
 */

/**
 * @swagger
 * /api/delivery-methods:
 *   post:
 *     tags: [DeliveryMethod]
 *     summary: Create a new DeliveryMethod
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
 *         description: DeliveryMethod created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/delivery-methods", deliveryMethodController.createDeliveryMethod);

/**
 * @swagger
 * /api/delivery-methods:
 *   get:
 *     tags: [DeliveryMethod]
 *     summary: Get all DeliveryMethods
 *     responses:
 *       200:
 *         description: List of DeliveryMethods
 *       500:
 *         description: Server error
 */
router.get("/delivery-methods", deliveryMethodController.getDeliveryMethods);

/**
 * @swagger
 * /api/delivery-methods/search:
 *   get:
 *     tags: [DeliveryMethod]
 *     summary: Search DeliveryMethods
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching DeliveryMethod list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/delivery-methods/search", deliveryMethodController.searchDeliveryMethods);

/**
 * @swagger
 * /api/delivery-methods/{id}:
 *   get:
 *     tags: [DeliveryMethod]
 *     summary: Get DeliveryMethod by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: DeliveryMethod ID
 *     responses:
 *       200:
 *         description: DeliveryMethod details
 *       404:
 *         description: DeliveryMethod not found
 *       500:
 *         description: Server error
 */
router.get("/delivery-methods/:id", deliveryMethodController.getDeliveryMethodById);

/**
 * @swagger
 * /api/delivery-methods/{id}:
 *   put:
 *     tags: [DeliveryMethod]
 *     summary: Update DeliveryMethod by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: DeliveryMethod ID
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
 *         description: DeliveryMethod updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: DeliveryMethod not found
 *       500:
 *         description: Server error
 */
router.put("/delivery-methods/:id", deliveryMethodController.updateDeliveryMethod);

/**
 * @swagger
 * /api/delivery-methods/{id}:
 *   delete:
 *     tags: [DeliveryMethod]
 *     summary: Delete DeliveryMethod by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: DeliveryMethod ID
 *     responses:
 *       200:
 *         description: DeliveryMethod deleted
 *       404:
 *         description: DeliveryMethod not found
 *       500:
 *         description: Server error
 */
router.delete("/delivery-methods/:id", deliveryMethodController.deleteDeliveryMethod);

module.exports = router;
