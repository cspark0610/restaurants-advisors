import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import {styles} from './RegisterForm.styles';
import Toast from 'react-native-toast-message';

// useFormik hook
import {useFormik} from 'formik';
import {initialValues, validationSchema} from './RegisterForm.data';

// firebase auth
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
// navegacion una vez registrado se navega a la pantalla de login, que es la pantalla anterior , usar un goBack()
import {useNavigation} from '@react-navigation/native';
import {screen} from '../../../utils/screenName';

type RegisterFormProps = {
  email: string;
  password: string;
};
export function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigation = useNavigation();

  const onSubmit = async (formData: RegisterFormProps) => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      navigation.navigate(screen.account.account as never);
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error al registrarse, intente mas tarde',
      });
    }
  };
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit,
  });

  const showHiddenPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={text => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.icon}
            onPress={showHiddenPassword}
          />
        }
        secureTextEntry={showPassword ? false : true}
        onChangeText={text => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Repetir Contraseña"
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.icon}
            onPress={showHiddenPassword}
          />
        }
        secureTextEntry={showPassword ? false : true}
        onChangeText={text => formik.setFieldValue('repeatPassword', text)}
        errorMessage={formik.errors.repeatPassword}
      />

      <Button
        title="Registrarse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit as any}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
