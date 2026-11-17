const Joi = require("joi");

const validateCart = (data) => {
    const schema = Joi.object({
        customer_id: Joi.number().required(),
        createdAt: Joi.date().iso().allow(null),
        fineshedAt: Joi.date().iso().allow(null),
        status_id: Joi.number().allow(null),
    });
    return schema.validate(data);
};

const validateCartUpdate = (data) => {
    const schema = Joi.object({
        customer_id: Joi.number(),
        createdAt: Joi.date().iso().allow(null),
        fineshedAt: Joi.date().iso().allow(null),
        status_id: Joi.number().allow(null),
    });
    return schema.validate(data);
};

module.exports = {
    validateCart,
    validateCartUpdate,
};
