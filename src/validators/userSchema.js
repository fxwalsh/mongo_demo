import Joi from 'joi';
import JoiDate from '@joi/date';

const NewJoi = Joi.extend(JoiDate);

const userSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required().regex(/^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[A-Za-z]).{7,}$/),
    name: Joi.string().min(1).required(),
    dob: NewJoi.date().format("DD/MM/YYYY"),
    type: Joi.string().valid('ADMIN','MEMBER')
});


export default  userSchema;