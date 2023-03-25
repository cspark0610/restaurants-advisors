// yup (para las validaciones de lo textos del formulario)
import * as Yup from 'yup';

export function initialValues() {
  return {
    email: '',
    password: '',
    repeatPassword: '',
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email('Formato de email inválido')
      .required('Email obligatorio'),
    password: Yup.string().required('Contraseña obligatoria'),
    repeatPassword: Yup.string()
      .required('Repetir contraseña requerida')
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
  });
}
