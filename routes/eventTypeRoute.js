const express = require("express");
const router = express.Router();
const eventTypeController = require("../controller/eventTypeController");

/**
 * @swagger
 * tags:
 *   name: EventType
 *   description: EventType management
 */

/**
 * @swagger
 * /api/event-types:
 *   post:
 *     tags: [EventType]
 *     summary: Create a new EventType
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent_event_type_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: EventType created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/event-types", eventTypeController.createEventType);

/**
 * @swagger
 * /api/event-types:
 *   get:
 *     tags: [EventType]
 *     summary: Get all EventTypes
 *     responses:
 *       200:
 *         description: List of EventTypes
 *       500:
 *         description: Server error
 */
router.get("/event-types", eventTypeController.getEventTypes);

/**
 * @swagger
 * /api/event-types/search:
 *   get:
 *     tags: [EventType]
 *     summary: Search EventTypes
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching EventType list
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/event-types/search", eventTypeController.searchEventTypes);

/**
 * @swagger
 * /api/event-types/{id}:
 *   get:
 *     tags: [EventType]
 *     summary: Get EventType by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: EventType ID
 *     responses:
 *       200:
 *         description: EventType details
 *       404:
 *         description: EventType not found
 *       500:
 *         description: Server error
 */
router.get("/event-types/:id", eventTypeController.getEventTypeById);

/**
 * @swagger
 * /api/event-types/{id}:
 *   put:
 *     tags: [EventType]
 *     summary: Update EventType by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: EventType ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent_event_type_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: EventType updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: EventType not found
 *       500:
 *         description: Server error
 */
router.put("/event-types/:id", eventTypeController.updateEventType);

/**
 * @swagger
 * /api/event-types/{id}:
 *   delete:
 *     tags: [EventType]
 *     summary: Delete EventType by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: EventType ID
 *     responses:
 *       200:
 *         description: EventType deleted
 *       404:
 *         description: EventType not found
 *       500:
 *         description: Server error
 */
router.delete("/event-types/:id", eventTypeController.deleteEventType);

module.exports = router;
