const express = require("express");
const router = express.Router();
const venuePhotoController = require("../controller/venuePhotoController");

/**
 * @swagger
 * tags:
 *   name: VenuePhoto
 *   description: VenuePhoto management
 */

/**
 * @swagger
 * /api/venue-photos:
 *   post:
 *     tags: [VenuePhoto]
 *     summary: Create a new VenuePhoto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: VenuePhoto created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/venue-photos", venuePhotoController.createVenuePhoto);

/**
 * @swagger
 * /api/venue-photos:
 *   get:
 *     tags: [VenuePhoto]
 *     summary: Get all VenuePhotos
 *     responses:
 *       200:
 *         description: List of VenuePhotos
 *       500:
 *         description: Server error
 */
router.get("/venue-photos", venuePhotoController.getVenuePhotos);

/**
 * @swagger
 * /api/venue-photos/search:
 *   get:
 *     tags: [VenuePhoto]
 *     summary: Search VenuePhotos
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching VenuePhoto list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/venue-photos/search", venuePhotoController.searchVenuePhotos);

/**
 * @swagger
 * /api/venue-photos/{id}:
 *   get:
 *     tags: [VenuePhoto]
 *     summary: Get VenuePhoto by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: VenuePhoto ID
 *     responses:
 *       200:
 *         description: VenuePhoto details
 *       404:
 *         description: VenuePhoto not found
 *       500:
 *         description: Server error
 */
router.get("/venue-photos/:id", venuePhotoController.getVenuePhotoById);

/**
 * @swagger
 * /api/venue-photos/{id}:
 *   put:
 *     tags: [VenuePhoto]
 *     summary: Update VenuePhoto by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: VenuePhoto ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: VenuePhoto updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: VenuePhoto not found
 *       500:
 *         description: Server error
 */
router.put("/venue-photos/:id", venuePhotoController.updateVenuePhoto);

/**
 * @swagger
 * /api/venue-photos/{id}:
 *   delete:
 *     tags: [VenuePhoto]
 *     summary: Delete VenuePhoto by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: VenuePhoto ID
 *     responses:
 *       200:
 *         description: VenuePhoto deleted
 *       404:
 *         description: VenuePhoto not found
 *       500:
 *         description: Server error
 */
router.delete("/venue-photos/:id", venuePhotoController.deleteVenuePhoto);

module.exports = router;
