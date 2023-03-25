import React from 'react';
import {ScrollView} from 'react-native';
import {Text, Button, Image} from 'react-native-elements';
import {styles} from './UserGuest.styles';
import {useNavigation} from '@react-navigation/native';
import {screen} from '../../../utils/screenName';

export function UserGuest() {
  const navigation = useNavigation();
  const goToLogin = () => {
    console.log('goToLogin');
    navigation.navigate(screen.account.login as never);
  };

  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image
        source={require('../../../../assests/img/user-guest.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Consultar tu perfil 5tenedores</Text>
      <Text style={styles.description}>
        ¿Cómo describirías tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado más y
        comenta como ha sido tu experiencia.
      </Text>

      <Button
        title="Ver tu perfil"
        style={styles.btnStyle}
        onPress={goToLogin}
      />
    </ScrollView>
  );
}
