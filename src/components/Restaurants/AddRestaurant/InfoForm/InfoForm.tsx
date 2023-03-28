import { View } from 'react-native';
import { Input } from 'react-native-elements';
import React, { useState } from 'react';
import { styles } from './InfoForm.styles';
import { MapForm } from '../MapForm';

// type InfoFormProps = {
//   formik: {
//     setFielValue: (field: string, value: string) => void;
//     errors: {
//       name: string;
//       address: string;
//       phone: string;
//       email: string;
//       description: string;
//     };
//   };
// };

export function InfoForm({ formik }: any) {
  const [showMap, setShowMap] = useState(false);

  const onOpenCloseIconMap = () => {
    setShowMap(prevState => !prevState);
  };
  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder="Nombre del restaurante"
          onChangeText={text => formik.setFieldValue('name', text)}
          errorMessage={formik.errors.name}
        />
        <Input
          placeholder="Direccion"
          onChangeText={text => formik.setFieldValue('address', text)}
          errorMessage={formik.errors.address}
          rightIcon={{
            type: 'material-community',
            name: 'map-marker-radius',
            color: getColorIconMap(formik),
            onPress: onOpenCloseIconMap,
          }}
        />
        <Input
          placeholder="Telefono"
          onChangeText={text => formik.setFieldValue('phone', text)}
          errorMessage={formik.errors.phone}
        />
        <Input
          placeholder="Email"
          onChangeText={text => formik.setFieldValue('email', text)}
          errorMessage={formik.errors.email}
        />
        <Input
          placeholder="Descripcion"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={text => formik.setFieldValue('description', text)}
          errorMessage={formik.errors.description}
        />
      </View>
      <MapForm show={showMap} close={onOpenCloseIconMap} formik={formik} />
    </>
  );
}

const getColorIconMap = formik => {
  if (formik.error?.location) {
    return '#ff0000';
  }
  if (formik.values?.location) {
    return '#00a680';
  }
  return '#c2c2c2';
};
