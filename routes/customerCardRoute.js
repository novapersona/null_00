const express = require("express");
const router = express.Router();
const customerCardController = require("../controller/customerCardController");

/**
 * @swagger
 * tags:
 *   name: CustomerCard
 *   description: CustomerCard management
 */

/**
 * @swagger
 * /api/customer-cards:
 *   post:
 *     tags: [CustomerCard]
 *     summary: Create a new CustomerCard
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: string
 *               month:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: CustomerCard created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/customer-cards", customerCardController.createCustomerCard);

/**
 * @swagger
 * /api/customer-cards:
 *   get:
 *     tags: [CustomerCard]
 *     summary: Get all CustomerCards
 *     responses:
 *       200:
 *         description: List of CustomerCards
 *       500:
 *         description: Server error
 */
router.get("/customer-cards", customerCardController.getCustomerCards);

/**
 * @swagger
 * /api/customer-cards/search:
 *   get:
 *     tags: [CustomerCard]
 *     summary: Search CustomerCards
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching CustomerCard list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/customer-cards/search", customerCardController.searchCustomerCards);

/**
 * @swagger
 * /api/customer-cards/{id}:
 *   get:
 *     tags: [CustomerCard]
 *     summary: Get CustomerCard by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: CustomerCard ID
 *     responses:
 *       200:
 *         description: CustomerCard details
 *       404:
 *         description: CustomerCard not found
 *       500:
 *         description: Server error
 */
router.get("/customer-cards/:id", customerCardController.getCustomerCardById);

/**
 * @swagger
 * /api/customer-cards/{id}:
 *   put:
 *     tags: [CustomerCard]
 *     summary: Update CustomerCard by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: CustomerCard ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: string
 *               month:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: CustomerCard updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: CustomerCard not found
 *       500:
 *         description: Server error
 */
router.put("/customer-cards/:id", customerCardController.updateCustomerCard);

/**
 * @swagger
 * /api/customer-cards/{id}:
 *   delete:
 *     tags: [CustomerCard]
 *     summary: Delete CustomerCard by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: CustomerCard ID
 *     responses:
 *       200:
 *         description: CustomerCard deleted
 *       404:
 *         description: CustomerCard not found
 *       500:
 *         description: Server error
 */
router.delete("/customer-cards/:id", customerCardController.deleteCustomerCard);

module.exports = router;
