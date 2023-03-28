import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import React from 'react';
import { styles } from './AddRestaurant.styles';
import {
  ImageRestaurant,
  InfoForm,
  UploadImageForm,
} from '../../../components/Restaurants/AddRestaurant';
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageRestaurant images={formik?.values?.images} />
      <InfoForm formik={formik} />
      <UploadImageForm formik={formik} />
      <Button
        title="Crear restaurante"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit as any}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
