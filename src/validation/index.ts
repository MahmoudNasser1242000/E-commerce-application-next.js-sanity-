import * as yup from "yup"

export const schema = yup
    .object({
        username: yup.string().min(3, "must me at least 2 characters").required(),
        email: yup.string().email().required(),
        message: yup.string().min(3, "must me at least 3 characters").required(),
    })
    .required()