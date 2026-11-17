const Joi = require("joi");

const validateCustomer = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).required(),
        last_name: Joi.string().allow(null, ""),
        phone: Joi.string().allow(null, ""),
        hashed_password: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        birth_date: Joi.date().iso().allow(null),
        gender_id: Joi.number().integer().allow(null),
        lang_id: Joi.number().integer().allow(null),
        hashed_refresh_token: Joi.string().allow(null, ""),
    });
    return schema.validate(data);
};

const validateCustomerUpdate = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2),
        last_name: Joi.string().allow(null, ""),
        phone: Joi.string().allow(null, ""),
        hashed_password: Joi.string().min(6),
        email: Joi.string().email(),
        birth_date: Joi.date().iso().allow(null),
        gender_id: Joi.number().integer().allow(null),
        lang_id: Joi.number().integer().allow(null),
        hashed_refresh_token: Joi.string().allow(null, ""),
    });
    return schema.validate(data);
};

module.exports = {
    validateCustomer,
    validateCustomerUpdate,
};
