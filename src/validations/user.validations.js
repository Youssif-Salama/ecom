// ==========>all post and put requests schemas of user model<==========
import Joi from "joi";
export const signupSchema = Joi.object({
    body: {
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        phone: Joi.string().required().pattern(new RegExp(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/))
    },
    params: {},
    query: {}
});

export const loginSchema = Joi.object({
    body: {
        email: Joi.string().email(),
        password: Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        phone: Joi.string().pattern(new RegExp(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/))
    },
    params: {},
    query: {}
});
