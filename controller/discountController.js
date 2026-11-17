const { Discount, Booking } = require("../models");
const { validateDiscount, validateDiscountUpdate } = require("../validations/discountValidation");
const { Op } = require("sequelize");

exports.createDiscount = async (req, res) => {
    const { error } = validateDiscount(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Discount.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getDiscounts = async (req, res) => {
    try {
        const items = await Discount.findAll({
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getDiscountById = async (req, res) => {
    try {
        const item = await Discount.findByPk(req.params.id, {
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Discount not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateDiscount = async (req, res) => {
    const { error } = validateDiscountUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Discount.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Discount not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteDiscount = async (req, res) => {
    try {
        const item = await Discount.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Discount not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Discount deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchDiscounts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await Discount.findAll({
            where: {
                [Op.or]: [
                    { discount: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
