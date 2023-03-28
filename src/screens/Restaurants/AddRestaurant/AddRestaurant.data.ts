import * as Yup from 'yup';

export function initialValues() {
  return {
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    location: null,
    images: [],
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string()
      .email('Wrong email format')
      .required('Email is required'),
    description: Yup.string().required('Description is required'),
    location: Yup.object(),
    images: Yup.array().min(1, 'al menos se requiere una imagen'),
  });
}
