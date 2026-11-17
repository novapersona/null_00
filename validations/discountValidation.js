const Joi = require("joi");

const validateDiscount = (data) => {
    const schema = Joi.object({
        discount: Joi.string().required(),
        finish_date: Joi.date().iso().allow(null),
    });
    return schema.validate(data);
};

const validateDiscountUpdate = (data) => {
    const schema = Joi.object({
        discount: Joi.string(),
        finish_date: Joi.date().iso().allow(null),
    });
    return schema.validate(data);
};

module.exports = {
    validateDiscount,
    validateDiscountUpdate,
};
