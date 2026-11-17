const { PaymentMethod, Booking } = require("../models");
const { validatePaymentMethod, validatePaymentMethodUpdate } = require("../validations/paymentMethodValidation");
const { Op } = require("sequelize");

exports.createPaymentMethod = async (req, res) => {
    const { error } = validatePaymentMethod(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await PaymentMethod.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getPaymentMethods = async (req, res) => {
    try {
        const items = await PaymentMethod.findAll({
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getPaymentMethodById = async (req, res) => {
    try {
        const item = await PaymentMethod.findByPk(req.params.id, {
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "PaymentMethod not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updatePaymentMethod = async (req, res) => {
    const { error } = validatePaymentMethodUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await PaymentMethod.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "PaymentMethod not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deletePaymentMethod = async (req, res) => {
    try {
        const item = await PaymentMethod.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "PaymentMethod not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "PaymentMethod deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchPaymentMethods = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await PaymentMethod.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } }
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
