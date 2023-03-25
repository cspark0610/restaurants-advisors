import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './ChangePasswordForm.styles';
import {Input, Button} from 'react-native-elements';
import {useFormik} from 'formik';
import {initialValues, validationSchema} from './ChangePasswordForm.data';

import Toast from 'react-native-toast-message';
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  User,
  EmailAuthProvider,
  EmailAuthCredential,
} from 'firebase/auth';

type ChangePasswordFormProps = {
  // no necesito el reload
  onClose: () => void;
};
type FormData = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

export function ChangePasswordForm({onClose}: ChangePasswordFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit = async (formData: FormData) => {
    console.log(formData);
    try {
      const currentUser: User | null = getAuth().currentUser;

      const currentUserEmail = currentUser?.providerData[0].email!;
      const credential: EmailAuthCredential = EmailAuthProvider.credential(
        currentUserEmail,
        formData.password,
      );

      reauthenticateWithCredential(currentUser!, credential);
      await updatePassword(currentUser!, formData.newPassword);

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Contrasena cambiada exitosamente',
      });
      onClose();
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error al cambiar la contrasena',
      });
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: onSubmit,
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Contrasena actual"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: 'material-community',
          name: showPassword ? 'eye-off-outline' : 'eye-outline',
          color: 'black',
          onPress: onShowPassword,
        }}
        onChangeText={text => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />

      <Input
        placeholder="Nueva Contrasena"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: 'material-community',
          name: showPassword ? 'eye-off-outline' : 'eye-outline',
          color: 'black',
          onPress: onShowPassword,
        }}
        onChangeText={text => formik.setFieldValue('newPassword', text)}
        errorMessage={formik.errors.newPassword}
      />

      <Input
        placeholder="Repite nueva contrasena"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: 'material-community',
          name: showPassword ? 'eye-off-outline' : 'eye-outline',
          color: 'black',
          onPress: onShowPassword,
        }}
        onChangeText={text => formik.setFieldValue('confirmNewPassword', text)}
        errorMessage={formik.errors.confirmNewPassword}
      />

      <Button
        title="Cambiar Contrasena"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit as any}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
