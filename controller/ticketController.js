const { Ticket, Event, Seat, TicketStatus, TicketType, CartItem } = require("../models");
const { validateTicket, validateTicketUpdate } = require("../validations/ticketValidation");
const { Op } = require("sequelize");

exports.createTicket = async (req, res) => {
    const { error } = validateTicket(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Ticket.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getTickets = async (req, res) => {
    try {
        const items = await Ticket.findAll({
            include: [
                { model: Event, as: "event" },
                { model: Seat, as: "seat" },
                { model: TicketStatus, as: "status" },
                { model: TicketType, as: "ticket_type" },
                { model: CartItem, as: "cart_items" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const item = await Ticket.findByPk(req.params.id, {
            include: [
                { model: Event, as: "event" },
                { model: Seat, as: "seat" },
                { model: TicketStatus, as: "status" },
                { model: TicketType, as: "ticket_type" },
                { model: CartItem, as: "cart_items" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Ticket not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateTicket = async (req, res) => {
    const { error } = validateTicketUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Ticket.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Ticket not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const item = await Ticket.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Ticket not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Ticket deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchTickets = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const whereClause = !isNaN(query) ? { id: query } : {};
        const items = await Ticket.findAll({
            where: whereClause,
            include: [
                { model: Event, as: "event" },
                { model: Seat, as: "seat" },
                { model: TicketStatus, as: "status" },
                { model: TicketType, as: "ticket_type" },
                { model: CartItem, as: "cart_items" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
