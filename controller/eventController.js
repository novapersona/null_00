const { Event, EventType, HumanCategory, Venue, Lang, Ticket } = require("../models");
const { validateEvent, validateEventUpdate } = require("../validations/eventValidation");
const { Op } = require("sequelize");

exports.createEvent = async (req, res) => {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Event.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const items = await Event.findAll({
            include: [
                { model: EventType, as: "event_type" },
                { model: HumanCategory, as: "human_category" },
                { model: Venue, as: "venue" },
                { model: Lang, as: "lang" },
                { model: Ticket, as: "tickets" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const item = await Event.findByPk(req.params.id, {
            include: [
                { model: EventType, as: "event_type" },
                { model: HumanCategory, as: "human_category" },
                { model: Venue, as: "venue" },
                { model: Lang, as: "lang" },
                { model: Ticket, as: "tickets" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Event not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { error } = validateEventUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Event.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Event not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const item = await Event.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Event not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchEvents = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await Event.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { info: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: EventType, as: "event_type" },
                { model: HumanCategory, as: "human_category" },
                { model: Venue, as: "venue" },
                { model: Lang, as: "lang" },
                { model: Ticket, as: "tickets" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
