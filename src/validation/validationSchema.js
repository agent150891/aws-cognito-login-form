import * as yup from 'yup';

const validateSchema = yup.object({
  username: yup
    .string()
    .required('Field is required')
    .min(3, 'Username must be at least 3 characters')
    .matches(/^\w{3,}$/i, 'Username contains ivalid characters'),
  password: yup
    .string()
    .required('Field is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain letters')
    .matches(/[A-Z]/, 'Password must contain capital letters')
    .matches(/\d/, 'Password must contain digits')
    .matches(/^[a-zA-Z0-9]{8,}$/, 'Password contains invalid characters'),
})

export { validateSchema }