const { TicketType, Ticket } = require("../models");
const { validateTicketType, validateTicketTypeUpdate } = require("../validations/ticketTypeValidation");
const { Op } = require("sequelize");

exports.createTicketType = async (req, res) => {
    const { error } = validateTicketType(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await TicketType.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getTicketTypes = async (req, res) => {
    try {
        const items = await TicketType.findAll({
            include: [
                { model: Ticket, as: "tickets" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getTicketTypeById = async (req, res) => {
    try {
        const item = await TicketType.findByPk(req.params.id, {
            include: [
                { model: Ticket, as: "tickets" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "TicketType not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateTicketType = async (req, res) => {
    const { error } = validateTicketTypeUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await TicketType.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "TicketType not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteTicketType = async (req, res) => {
    try {
        const item = await TicketType.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "TicketType not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "TicketType deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchTicketTypes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await TicketType.findAll({
            where: {
                [Op.or]: [
                    { ticket_type: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Ticket, as: "tickets" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
