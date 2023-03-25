import * as Yup from 'yup';

export function initialValues() {
  return {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().required('Password es obligatorio'),
    newPassword: Yup.string().required('Nuevo password es obligatorio'),
    confirmNewPassword: Yup.string()
      .required('Este campo es obligatorio')
      .oneOf(
        [Yup.ref('newPassword')],
        'Las nuevas contraseñas deben ser iguales',
      ),
  });
}
