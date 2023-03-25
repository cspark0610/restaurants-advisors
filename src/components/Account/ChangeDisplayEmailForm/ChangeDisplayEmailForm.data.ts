import * as Yup from 'yup';

export function initialValues() {
  return {
    email: '',
    password: '',
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email('El email no es valido')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
}
