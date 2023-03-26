import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { styles } from './Login.styles';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils/screenName';
import { LoginForm } from '../../../components/Auth';

export function Login() {
  const navigation = useNavigation();
  const goToRegister = () => {
    navigation.navigate(screen.account.register as never);
  };
  return (
    <ScrollView>
      <Image
        source={require('../../../../assests/img/5-tenedores-letras-icono-logo.png')}
        style={styles.image}
      />
      <View style={styles.content}>
        <LoginForm />

        <Text style={styles.textRegister}>
          ¿Aún no tienes una cuenta?
          <Text onPress={goToRegister} style={styles.btnRegister}>
            {' '}
            Regístrate
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
