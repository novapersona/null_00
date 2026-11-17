const { CartItem, Cart, Ticket } = require("../models");
const { validateCartItem, validateCartItemUpdate } = require("../validations/cartItemValidation");
const { Op } = require("sequelize");

exports.createCartItem = async (req, res) => {
    const { error } = validateCartItem(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await CartItem.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const items = await CartItem.findAll({
            include: [
                { model: Cart, as: "cart" },
                { model: Ticket, as: "ticket" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getCartItemById = async (req, res) => {
    try {
        const item = await CartItem.findByPk(req.params.id, {
            include: [
                { model: Cart, as: "cart" },
                { model: Ticket, as: "ticket" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "CartItem not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    const { error } = validateCartItemUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await CartItem.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "CartItem not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const item = await CartItem.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "CartItem not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "CartItem deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchCartItems = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const whereClause = !isNaN(query) ? { id: query } : {};
        const items = await CartItem.findAll({
            where: whereClause,
            include: [
                { model: Cart, as: "cart" },
                { model: Ticket, as: "ticket" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
