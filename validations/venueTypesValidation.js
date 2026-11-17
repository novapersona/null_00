const Joi = require("joi");

const validateVenueTypes = (data) => {
    const schema = Joi.object({
        venueId: Joi.number().required(),
        typeId: Joi.number().required(),
    });
    return schema.validate(data);
};

const validateVenueTypesUpdate = (data) => {
    const schema = Joi.object({
        venueId: Joi.number(),
        typeId: Joi.number(),
    });
    return schema.validate(data);
};

module.exports = {
    validateVenueTypes,
    validateVenueTypesUpdate,
};
