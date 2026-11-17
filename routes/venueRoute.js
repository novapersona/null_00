const express = require("express");
const router = express.Router();
const venueController = require("../controller/venueController");

/**
 * @swagger
 * tags:
 *   name: Venue
 *   description: Venue management
 */

/**
 * @swagger
 * /api/venues:
 *   post:
 *     tags: [Venue]
 *     summary: Create a new Venue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               site:
 *                 type: string
 *               phone:
 *                 type: string
 *               schema:
 *                 type: string
 *               region_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Venue created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/venues", venueController.createVenue);

/**
 * @swagger
 * /api/venues:
 *   get:
 *     tags: [Venue]
 *     summary: Get all Venues
 *     responses:
 *       200:
 *         description: List of Venues
 *       500:
 *         description: Server error
 */
router.get("/venues", venueController.getVenues);

/**
 * @swagger
 * /api/venues/search:
 *   get:
 *     tags: [Venue]
 *     summary: Search Venues
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching Venue list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/venues/search", venueController.searchVenues);

/**
 * @swagger
 * /api/venues/{id}:
 *   get:
 *     tags: [Venue]
 *     summary: Get Venue by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue ID
 *     responses:
 *       200:
 *         description: Venue details
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Server error
 */
router.get("/venues/:id", venueController.getVenueById);

/**
 * @swagger
 * /api/venues/{id}:
 *   put:
 *     tags: [Venue]
 *     summary: Update Venue by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               site:
 *                 type: string
 *               phone:
 *                 type: string
 *               schema:
 *                 type: string
 *               region_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Venue updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Server error
 */
router.put("/venues/:id", venueController.updateVenue);

/**
 * @swagger
 * /api/venues/{id}:
 *   delete:
 *     tags: [Venue]
 *     summary: Delete Venue by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Venue ID
 *     responses:
 *       200:
 *         description: Venue deleted
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Server error
 */
router.delete("/venues/:id", venueController.deleteVenue);

module.exports = router;
