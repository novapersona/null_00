const express = require("express");
const router = express.Router();
const seatTypeController = require("../controller/seatTypeController");

/**
 * @swagger
 * tags:
 *   name: SeatType
 *   description: SeatType management
 */

/**
 * @swagger
 * /api/seat-types:
 *   post:
 *     tags: [SeatType]
 *     summary: Create a new SeatType
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
 *         description: SeatType created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/seat-types", seatTypeController.createSeatType);

/**
 * @swagger
 * /api/seat-types:
 *   get:
 *     tags: [SeatType]
 *     summary: Get all SeatTypes
 *     responses:
 *       200:
 *         description: List of SeatTypes
 *       500:
 *         description: Server error
 */
router.get("/seat-types", seatTypeController.getSeatTypes);

/**
 * @swagger
 * /api/seat-types/search:
 *   get:
 *     tags: [SeatType]
 *     summary: Search SeatTypes
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching SeatType list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/seat-types/search", seatTypeController.searchSeatTypes);

/**
 * @swagger
 * /api/seat-types/{id}:
 *   get:
 *     tags: [SeatType]
 *     summary: Get SeatType by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: SeatType ID
 *     responses:
 *       200:
 *         description: SeatType details
 *       404:
 *         description: SeatType not found
 *       500:
 *         description: Server error
 */
router.get("/seat-types/:id", seatTypeController.getSeatTypeById);

/**
 * @swagger
 * /api/seat-types/{id}:
 *   put:
 *     tags: [SeatType]
 *     summary: Update SeatType by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: SeatType ID
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
 *         description: SeatType updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: SeatType not found
 *       500:
 *         description: Server error
 */
router.put("/seat-types/:id", seatTypeController.updateSeatType);

/**
 * @swagger
 * /api/seat-types/{id}:
 *   delete:
 *     tags: [SeatType]
 *     summary: Delete SeatType by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: SeatType ID
 *     responses:
 *       200:
 *         description: SeatType deleted
 *       404:
 *         description: SeatType not found
 *       500:
 *         description: Server error
 */
router.delete("/seat-types/:id", seatTypeController.deleteSeatType);

module.exports = router;
