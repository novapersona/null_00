const Joi = require("joi");

const validateFlat = (data) => {
    const schema = Joi.object({
        etaj: Joi.number().required(),
        condition: Joi.string().allow(null, ""),
    });
    return schema.validate(data);
};

const validateFlatUpdate = (data) => {
    const schema = Joi.object({
        etaj: Joi.number(),
        condition: Joi.string().allow(null, ""),
    });
    return schema.validate(data);
};

module.exports = {
    validateFlat,
    validateFlatUpdate,
};
