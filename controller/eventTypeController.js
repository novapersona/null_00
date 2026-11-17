const { EventType, Event } = require("../models");
const { validateEventType, validateEventTypeUpdate } = require("../validations/eventTypeValidation");
const { Op } = require("sequelize");

exports.createEventType = async (req, res) => {
    const { error } = validateEventType(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await EventType.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getEventTypes = async (req, res) => {
    try {
        const items = await EventType.findAll({
            include: [
                { model: EventType, as: "parent" },
                { model: EventType, as: "children" },
                { model: Event, as: "events" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getEventTypeById = async (req, res) => {
    try {
        const item = await EventType.findByPk(req.params.id, {
            include: [
                { model: EventType, as: "parent" },
                { model: EventType, as: "children" },
                { model: Event, as: "events" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "EventType not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateEventType = async (req, res) => {
    const { error } = validateEventTypeUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await EventType.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "EventType not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteEventType = async (req, res) => {
    try {
        const item = await EventType.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "EventType not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "EventType deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchEventTypes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await EventType.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: EventType, as: "parent" },
                { model: EventType, as: "children" },
                { model: Event, as: "events" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
