const express = require("express");
const router = express.Router();
const seatController = require("../controller/seatController");

/**
 * @swagger
 * tags:
 *   name: Seat
 *   description: Seat management
 */

/**
 * @swagger
 * /api/seats:
 *   post:
 *     tags: [Seat]
 *     summary: Create a new Seat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_id:
 *                 type: integer
 *               row_number:
 *                 type: integer
 *               number:
 *                 type: integer
 *               venue_id:
 *                 type: integer
 *               seat_type_id:
 *                 type: integer
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       201:
 *         description: Seat created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/seats", seatController.createSeat);

/**
 * @swagger
 * /api/seats:
 *   get:
 *     tags: [Seat]
 *     summary: Get all Seats
 *     responses:
 *       200:
 *         description: List of Seats
 *       500:
 *         description: Server error
 */
router.get("/seats", seatController.getSeats);

/**
 * @swagger
 * /api/seats/search:
 *   get:
 *     tags: [Seat]
 *     summary: Search Seats
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching Seat list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/seats/search", seatController.searchSeats);

/**
 * @swagger
 * /api/seats/{id}:
 *   get:
 *     tags: [Seat]
 *     summary: Get Seat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat ID
 *     responses:
 *       200:
 *         description: Seat details
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.get("/seats/:id", seatController.getSeatById);

/**
 * @swagger
 * /api/seats/{id}:
 *   put:
 *     tags: [Seat]
 *     summary: Update Seat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_id:
 *                 type: integer
 *               row_number:
 *                 type: integer
 *               number:
 *                 type: integer
 *               venue_id:
 *                 type: integer
 *               seat_type_id:
 *                 type: integer
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       200:
 *         description: Seat updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.put("/seats/:id", seatController.updateSeat);

/**
 * @swagger
 * /api/seats/{id}:
 *   delete:
 *     tags: [Seat]
 *     summary: Delete Seat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Seat ID
 *     responses:
 *       200:
 *         description: Seat deleted
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.delete("/seats/:id", seatController.deleteSeat);

module.exports = router;
