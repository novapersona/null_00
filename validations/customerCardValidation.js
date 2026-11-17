const Joi = require("joi");

const validateCustomerCard = (data) => {
    const schema = Joi.object({
        customer_id: Joi.number().required(),
        name: Joi.string().required(),
        phone: Joi.string().allow(null, ""),
        number: Joi.string().required(),
        year: Joi.string().length(4).required(),
        month: Joi.string().length(2).required(),
        is_active: Joi.boolean(),
        is_main: Joi.boolean(),
    });
    return schema.validate(data);
};

const validateCustomerCardUpdate = (data) => {
    const schema = Joi.object({
        customer_id: Joi.number(),
        name: Joi.string(),
        phone: Joi.string().allow(null, ""),
        number: Joi.string(),
        year: Joi.string().length(4),
        month: Joi.string().length(2),
        is_active: Joi.boolean(),
        is_main: Joi.boolean(),
    });
    return schema.validate(data);
};

module.exports = {
    validateCustomerCard,
    validateCustomerCardUpdate,
};
