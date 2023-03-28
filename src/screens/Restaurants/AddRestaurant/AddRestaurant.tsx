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
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { randomString } from '../../../utils/randomString';

export function AddRestaurant() {
  const navigation = useNavigation();
  const onSubmitForm = async (formData: any) => {
    try {
      const newBody = { ...formData };
      newBody.id = randomString();
      newBody.createdAt = new Date();
      const collectionName = 'restaurants';
      const collectionRef = collection(db, collectionName);
      await addDoc(collectionRef, newBody);

      navigation.goBack();
    } catch (error) {
      console.log(error, 'error onSubmit');
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),
    onSubmit: onSubmitForm,
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
