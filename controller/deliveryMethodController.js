const { DeliveryMethod, Booking } = require("../models");
const { validateDeliveryMethod, validateDeliveryMethodUpdate } = require("../validations/deliveryMethodValidation");
const { Op } = require("sequelize");

exports.createDeliveryMethod = async (req, res) => {
    const { error } = validateDeliveryMethod(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await DeliveryMethod.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getDeliveryMethods = async (req, res) => {
    try {
        const items = await DeliveryMethod.findAll({
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getDeliveryMethodById = async (req, res) => {
    try {
        const item = await DeliveryMethod.findByPk(req.params.id, {
            include: [
                { model: Booking, as: "bookings" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "DeliveryMethod not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateDeliveryMethod = async (req, res) => {
    const { error } = validateDeliveryMethodUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await DeliveryMethod.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "DeliveryMethod not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteDeliveryMethod = async (req, res) => {
    try {
        const item = await DeliveryMethod.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "DeliveryMethod not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "DeliveryMethod deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchDeliveryMethods = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await DeliveryMethod.findAll({
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
