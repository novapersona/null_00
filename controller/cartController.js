const { Cart, Customer, TicketStatus, CartItem, Booking } = require("../models");
const { validateCart, validateCartUpdate } = require("../validations/cartValidation");
const { Op } = require("sequelize");

exports.createCart = async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Cart.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getCarts = async (req, res) => {
    try {
        const items = await Cart.findAll({
            include: [
                { model: Customer, as: "customer" },
                { model: TicketStatus, as: "status" },
                { model: CartItem, as: "cart_items" },
                { model: Booking, as: "bookings" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getCartById = async (req, res) => {
    try {
        const item = await Cart.findByPk(req.params.id, {
            include: [
                { model: Customer, as: "customer" },
                { model: TicketStatus, as: "status" },
                { model: CartItem, as: "cart_items" },
                { model: Booking, as: "bookings" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Cart not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateCart = async (req, res) => {
    const { error } = validateCartUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Cart.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Cart not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const item = await Cart.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Cart not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchCarts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const whereClause = !isNaN(query) ? { id: query } : {};
        const items = await Cart.findAll({
            where: whereClause,
            include: [
                { model: Customer, as: "customer" },
                { model: TicketStatus, as: "status" },
                { model: CartItem, as: "cart_items" },
                { model: Booking, as: "bookings" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
