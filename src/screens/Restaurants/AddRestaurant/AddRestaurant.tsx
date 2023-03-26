import { View } from 'react-native';
import { Button } from 'react-native-elements';
import React from 'react';
import { styles } from './AddRestaurant.styles';
import { InfoForm } from '../../../components/Restaurants/AddRestaurant';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './AddRestaurant.data';

export function AddRestaurant() {
  const onSubmit = async (formData: any) => {
    console.log(formData, 'formData');
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: onSubmit,
  });
  return (
    <View>
      <InfoForm formik={formik} />
      <Button
        title="Crear restaurante"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit as any}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
