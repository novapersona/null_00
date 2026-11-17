const { CustomerCard, Customer } = require("../models");
const { validateCustomerCard, validateCustomerCardUpdate } = require("../validations/customerCardValidation");
const { Op } = require("sequelize");

exports.createCustomerCard = async (req, res) => {
    const { error } = validateCustomerCard(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await CustomerCard.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getCustomerCards = async (req, res) => {
    try {
        const items = await CustomerCard.findAll({
            include: [
                { model: Customer, as: "customer" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getCustomerCardById = async (req, res) => {
    try {
        const item = await CustomerCard.findByPk(req.params.id, {
            include: [
                { model: Customer, as: "customer" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "CustomerCard not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateCustomerCard = async (req, res) => {
    const { error } = validateCustomerCardUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await CustomerCard.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "CustomerCard not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteCustomerCard = async (req, res) => {
    try {
        const item = await CustomerCard.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "CustomerCard not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "CustomerCard deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchCustomerCards = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await CustomerCard.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { phone: { [Op.iLike]: `%${query}%` } },
                    { number: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Customer, as: "customer" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
