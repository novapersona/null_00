const { TicketStatus, Booking, Cart, Ticket } = require("../models");
const { validateTicketStatus, validateTicketStatusUpdate } = require("../validations/ticketStatusValidation");
const { Op } = require("sequelize");

exports.createTicketStatus = async (req, res) => {
    const { error } = validateTicketStatus(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await TicketStatus.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getTicketStatuss = async (req, res) => {
    try {
        const items = await TicketStatus.findAll({
            include: [
                { model: Booking, as: "bookings" },
                { model: Cart, as: "carts" },
                { model: Ticket, as: "tickets" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getTicketStatusById = async (req, res) => {
    try {
        const item = await TicketStatus.findByPk(req.params.id, {
            include: [
                { model: Booking, as: "bookings" },
                { model: Cart, as: "carts" },
                { model: Ticket, as: "tickets" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "TicketStatus not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateTicketStatus = async (req, res) => {
    const { error } = validateTicketStatusUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await TicketStatus.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "TicketStatus not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteTicketStatus = async (req, res) => {
    try {
        const item = await TicketStatus.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "TicketStatus not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "TicketStatus deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchTicketStatuss = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await TicketStatus.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Booking, as: "bookings" },
                { model: Cart, as: "carts" },
                { model: Ticket, as: "tickets" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
