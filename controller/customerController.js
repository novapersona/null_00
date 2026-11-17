const { Customer, Gender, Lang, CustomerCard, CustomerAddress, Cart } = require("../models");
const { validateCustomer, validateCustomerUpdate } = require("../validations/customerValidation");
const { Op } = require("sequelize");

exports.createCustomer = async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Customer.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const items = await Customer.findAll({
            include: [
                { model: Gender, as: "gender" },
                { model: Lang, as: "lang" },
                { model: CustomerCard, as: "cards" },
                { model: CustomerAddress, as: "addresses" },
                { model: Cart, as: "cart" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const item = await Customer.findByPk(req.params.id, {
            include: [
                { model: Gender, as: "gender" },
                { model: Lang, as: "lang" },
                { model: CustomerCard, as: "cards" },
                { model: CustomerAddress, as: "addresses" },
                { model: Cart, as: "cart" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Customer not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    const { error } = validateCustomerUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Customer.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Customer not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const item = await Customer.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Customer not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchCustomers = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await Customer.findAll({
            where: {
                [Op.or]: [
                    { first_name: { [Op.iLike]: `%${query}%` } },
                    { last_name: { [Op.iLike]: `%${query}%` } },
                    { email: { [Op.iLike]: `%${query}%` } },
                    { phone: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Gender, as: "gender" },
                { model: Lang, as: "lang" },
                { model: CustomerCard, as: "cards" },
                { model: CustomerAddress, as: "addresses" },
                { model: Cart, as: "cart" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
