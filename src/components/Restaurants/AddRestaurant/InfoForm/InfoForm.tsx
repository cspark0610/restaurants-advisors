import {View} from 'react-native';
import {Input} from 'react-native-elements';
import React, {useState} from 'react';
import {styles} from './InfoForm.styles';
import {MapForm} from '../MapForm';

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

export function InfoForm({formik}) {
  const [showMap, setShowMap] = useState(false);

  const onOpenCloseIconMap = () => {
    setShowMap(prevState => !prevState);
  };
  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder="Nombre del restaurante"
          onChangeText={text => formik.setFielValue('name', text)}
          errorMessage={formik.errors.name}
        />
        <Input
          placeholder="Direccion"
          onChangeText={text => formik.setFielValue('address', text)}
          errorMessage={formik.errors.address}
          rightIcon={{
            type: 'material-community',
            name: 'map-marker-radius',
            color: '#c2c2c2',
            onPress: onOpenCloseIconMap,
          }}
        />
        <Input
          placeholder="Telefono"
          onChangeText={text => formik.setFielValue('phone', text)}
          errorMessage={formik.errors.phone}
        />
        <Input
          placeholder="Email"
          onChangeText={text => formik.setFielValue('email', text)}
          errorMessage={formik.errors.email}
        />
        <Input
          placeholder="Descripcion"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={text => formik.setFielValue('description', text)}
          errorMessage={formik.errors.description}
        />
      </View>
      <MapForm show={showMap} close={onOpenCloseIconMap} />
    </>
  );
}
