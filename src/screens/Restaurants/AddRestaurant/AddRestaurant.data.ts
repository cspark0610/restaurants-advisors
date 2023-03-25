import * as Yup from 'yup';

export function initialValues() {
  return {
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    // city: '',
    // state: '',
    // zip: '',
    // cuisine: '',
    // website: '',
    // notes: '',
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
  });
}
