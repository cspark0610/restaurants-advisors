import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

import { styles } from './LoginForm.styles';
import { useFormik } from 'formik';
import { validationSchema, initialValues } from './LoginForm.data';

import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils/screenName';

//auth firebase login logic
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

type LoginFormProps = {
  email: string;
  password: string;
};

export function LoginForm() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitLoginForm = async (formData: LoginFormProps) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigation.navigate(screen.account.account as never);
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error al iniciar sesion, intente mas tarde',
      });
    }
  };
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: onSubmitLoginForm,
  });

  const showHiddenPassword = () => setShowPassword(prev => !prev);

  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        rightIcon={
          <Icon name="at" type="material-community" iconStyle={styles.icon} />
        }
        onChangeText={text => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contrasena"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.icon}
            onPress={showHiddenPassword}
          />
        }
        onChangeText={text => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />

      <Button
        title="Iniciar Sesion"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit as any}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
