import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Icon, Avatar, Text } from 'react-native-elements';
import { styles } from './UploadImageForm.styles';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { LoadingModal } from '../../../Shared';

export function UploadImageForm({ formik }) {
  const [loading, setLoading] = useState(false);

  const uploadImageToFirebase = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `restaurants/${v4()}`);

    uploadBytes(storageRef, blob)
      .then(snapshot => {
        updatePhotosRestaurant(snapshot.metadata.fullPath);
      })
      .catch(error => {
        console.log(error, 'error uploadImageToFirebase');
      });
  };

  const updatePhotosRestaurant = async (imagePath: string) => {
    const storage = getStorage();
    try {
      const imageRef = ref(storage, imagePath);
      const imageUrl = await getDownloadURL(imageRef);
      formik.setFieldValue('images', [...formik?.values?.images, imageUrl]);
      setLoading(false);
    } catch (error) {
      console.log(error, 'error updatePhotosRestaurant');
    }
  };

  const openGallery = async () => {
    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    if (!result.canceled) {
      const uri = result.assets[0]?.uri;
      setLoading(true);
      await uploadImageToFirebase(uri);
    }
  };

  const removeImage = (img: string) => {
    Alert.alert(
      'Eliminar imagen',
      '¿Estas seguro de eliminar la imagen?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            const filteredImages = formik?.values?.images.filter(
              (imageUrl: string) => imageUrl !== img,
            );
            formik.setFieldValue('images', filteredImages);
          },
        },
      ],
      { cancelable: false },
    );
  };
  return (
    <>
      <ScrollView
        style={styles.viewImage}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />

        {formik?.values?.images &&
          formik?.values?.images.map((image: string) => (
            <Avatar
              key={image}
              source={{ uri: image }}
              containerStyle={styles.imageStyle}
              onPress={() => removeImage(image)}
            />
          ))}
      </ScrollView>
      <Text style={styles.error}>{formik?.errors.images}</Text>

      <LoadingModal show={loading} text="Subiendo imagen" />
    </>
  );
}
