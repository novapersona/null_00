const { Booking, Cart, PaymentMethod, DeliveryMethod, Discount, TicketStatus } = require("../models");
const { validateBooking, validateBookingUpdate } = require("../validations/bookingValidation");
const { Op } = require("sequelize");

exports.createBooking = async (req, res) => {
    const { error } = validateBooking(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Booking.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const items = await Booking.findAll({
            include: [
                { model: Cart, as: "cart" },
                { model: PaymentMethod, as: "payment_method" },
                { model: DeliveryMethod, as: "delivery_method" },
                { model: Discount, as: "discount" },
                { model: TicketStatus, as: "status" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const item = await Booking.findByPk(req.params.id, {
            include: [
                { model: Cart, as: "cart" },
                { model: PaymentMethod, as: "payment_method" },
                { model: DeliveryMethod, as: "delivery_method" },
                { model: Discount, as: "discount" },
                { model: TicketStatus, as: "status" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Booking not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    const { error } = validateBookingUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Booking.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Booking not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const item = await Booking.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Booking not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchBookings = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const whereClause = !isNaN(query) ? { id: query } : {};
        const items = await Booking.findAll({
            where: whereClause,
            include: [
                { model: Cart, as: "cart" },
                { model: PaymentMethod, as: "payment_method" },
                { model: DeliveryMethod, as: "delivery_method" },
                { model: Discount, as: "discount" },
                { model: TicketStatus, as: "status" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
