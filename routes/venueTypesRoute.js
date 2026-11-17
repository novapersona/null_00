const express = require("express");
const router = express.Router();
const venueTypesController = require("../controller/venueTypesController");

/**
 * @swagger
 * tags:
 *   name: VenueTypes
 *   description: VenueTypes management
 */

/**
 * @swagger
 * /api/venue-types:
 *   post:
 *     tags: [VenueTypes]
 *     summary: Create a new VenueTypes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               typeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: VenueTypes created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/venue-types", venueTypesController.createVenueTypes);

/**
 * @swagger
 * /api/venue-types:
 *   get:
 *     tags: [VenueTypes]
 *     summary: Get all VenueTypess
 *     responses:
 *       200:
 *         description: List of VenueTypess
 *       500:
 *         description: Server error
 */
router.get("/venue-types", venueTypesController.getVenueTypess);

/**
 * @swagger
 * /api/venue-types/search:
 *   get:
 *     tags: [VenueTypes]
 *     summary: Search VenueTypess
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching VenueTypes list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/venue-types/search", venueTypesController.searchVenueTypess);

/**
 * @swagger
 * /api/venue-types/{id}:
 *   get:
 *     tags: [VenueTypes]
 *     summary: Get VenueTypes by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: VenueTypes ID
 *     responses:
 *       200:
 *         description: VenueTypes details
 *       404:
 *         description: VenueTypes not found
 *       500:
 *         description: Server error
 */
router.get("/venue-types/:id", venueTypesController.getVenueTypesById);

/**
 * @swagger
 * /api/venue-types/{id}:
 *   put:
 *     tags: [VenueTypes]
 *     summary: Update VenueTypes by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: VenueTypes ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               typeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: VenueTypes updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: VenueTypes not found
 *       500:
 *         description: Server error
 */
router.put("/venue-types/:id", venueTypesController.updateVenueTypes);

/**
 * @swagger
 * /api/venue-types/{id}:
 *   delete:
 *     tags: [VenueTypes]
 *     summary: Delete VenueTypes by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: VenueTypes ID
 *     responses:
 *       200:
 *         description: VenueTypes deleted
 *       404:
 *         description: VenueTypes not found
 *       500:
 *         description: Server error
 */
router.delete("/venue-types/:id", venueTypesController.deleteVenueTypes);

module.exports = router;
