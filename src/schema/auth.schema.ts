import * as yup from "yup";


export const registerSchema = yup.object({
    username: yup.string().required('This field is required'),
    email: yup.string().email().required('This field is required'),
    password: yup.string().required('This field is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match').required('This field is required')
})

export const loginSchema = yup.object({
    username: yup.string().notRequired(),
    email: yup.string().email().required('This field is required'),
    password: yup.string().required('This field is required'),
    confirmPassword: yup.string().notRequired()

})