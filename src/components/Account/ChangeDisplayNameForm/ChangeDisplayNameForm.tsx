import React from 'react';
import {View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {styles} from './ChangeDisplayNameForm.styles';
import {useFormik} from 'formik';
import {initialValues, validationSchema} from './ChangeDisplayNameForm.data';
import Toast from 'react-native-toast-message';
import {getAuth, updateProfile} from 'firebase/auth';

type ChangeDisplayNameFormProps = {
  onClose: () => void;
  onReload: () => void;
};

export function ChangeDisplayNameForm({
  onClose,
  onReload,
}: ChangeDisplayNameFormProps) {
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: validationSchema(),

    onSubmit: async ({displayName}) => {
      const currentUser = getAuth().currentUser!;
      try {
        await updateProfile(currentUser, {displayName});

        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error al actualizar el nombre y apellidos',
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre y apellidos"
        rightIcon={{
          type: 'material-community',
          name: 'account-circle-outline',
          color: '#c2c2c2',
        }}
        onChangeText={text => formik.setFieldValue('displayName', text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar nombre y apellidos"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit as any}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
