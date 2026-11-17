const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Booking management
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags: [Booking]
 *     summary: Create a new Booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: integer
 *               createdAt:
 *                 type: string
 *               fineshed:
 *                 type: string
 *               payment_method_id:
 *                 type: integer
 *               delivery_method_id:
 *                 type: integer
 *               discount_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/bookings", bookingController.createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     tags: [Booking]
 *     summary: Get all Bookings
 *     responses:
 *       200:
 *         description: List of Bookings
 *       500:
 *         description: Server error
 */
router.get("/bookings", bookingController.getBookings);

/**
 * @swagger
 * /api/bookings/search:
 *   get:
 *     tags: [Booking]
 *     summary: Search Bookings
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching Booking list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/bookings/search", bookingController.searchBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     tags: [Booking]
 *     summary: Get Booking by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.get("/bookings/:id", bookingController.getBookingById);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     tags: [Booking]
 *     summary: Update Booking by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: integer
 *               createdAt:
 *                 type: string
 *               fineshed:
 *                 type: string
 *               payment_method_id:
 *                 type: integer
 *               delivery_method_id:
 *                 type: integer
 *               discount_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Booking updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.put("/bookings/:id", bookingController.updateBooking);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     tags: [Booking]
 *     summary: Delete Booking by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.delete("/bookings/:id", bookingController.deleteBooking);

module.exports = router;
