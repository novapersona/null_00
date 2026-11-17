const Joi = require("joi");

const validateVenuePhoto = (data) => {
    const schema = Joi.object({
        venueId: Joi.number().required(),
        url: Joi.string().required(),
    });
    return schema.validate(data);
};

const validateVenuePhotoUpdate = (data) => {
    const schema = Joi.object({
        venueId: Joi.number(),
        url: Joi.string(),
    });
    return schema.validate(data);
};

module.exports = {
    validateVenuePhoto,
    validateVenuePhotoUpdate,
};
