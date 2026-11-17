const Joi = require("joi");

const validateHumanCategory = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        start_age: Joi.number().integer().min(0).allow(null),
        finish_age: Joi.number().integer().min(0).allow(null),
        gender_id: Joi.number().integer().allow(null),
    });
    return schema.validate(data);
};

const validateHumanCategoryUpdate = (data) => {
    const schema = Joi.object({
        name: Joi.string(),
        start_age: Joi.number().integer().min(0).allow(null),
        finish_age: Joi.number().integer().min(0).allow(null),
        gender_id: Joi.number().integer().allow(null),
    });
    return schema.validate(data);
};

module.exports = {
    validateHumanCategory,
    validateHumanCategoryUpdate,
};
