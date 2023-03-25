import React, {useState} from 'react';
import {View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {useFormik} from 'formik';
import {styles} from './ChangeDisplayEmailForm.styles';
import {initialValues, validationSchema} from './ChangeDisplayEmailForm.data';

import Toast from 'react-native-toast-message';
import {
  getAuth,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User,
  EmailAuthCredential,
} from 'firebase/auth';

type ChangeDisplayEmailFormProps = {
  onClose: () => void;
  onReload: () => void;
};

type FormData = {
  email: string;
  password: string;
};

export function ChangeDisplayEmailForm({
  onClose,
  onReload,
}: ChangeDisplayEmailFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit = async (formData: FormData) => {
    try {
      const currentUser: User | null = getAuth().currentUser;
      const currentUserEmail = currentUser?.providerData[0].email!;

      const credential: EmailAuthCredential = EmailAuthProvider.credential(
        currentUserEmail,
        formData.password,
      );

      reauthenticateWithCredential(currentUser!, credential);
      await updateEmail(currentUser!, formData.email);

      onReload();
      onClose();
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error al cambiar el email',
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
        placeholder="Nuevo email"
        containerStyle={styles.input}
        onChangeText={text => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Ingresar contrasena"
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
      <Button
        title="Cambiar Email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit as any}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
