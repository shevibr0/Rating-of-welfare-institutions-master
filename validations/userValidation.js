import Joi from 'joi';
//? required => must be there in the body of the request
const userValidation = {
    signUp: (_bodyData) => {
        //? schema for validation
        const schema = Joi.object({
            name: Joi.string().min(2).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(30).required()
        })
        return schema.validate(_bodyData)
    },
    login: (_bodyData) => {
        //? schema for validation
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(30).required()
        })

        //!return schema.validate(_bodyData) => {error, value}
        return schema.validate(_bodyData)
    }
};

export default userValidation;