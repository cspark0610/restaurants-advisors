import React from 'react';
import {View} from 'react-native';
import {Image} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './Register.styles';
import {RegisterForm} from '../../../components/Auth';

export function Register() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require('../../../../assests/img/5-tenedores-letras-icono-logo.png')}
        style={styles.image}
      />
      <View style={styles.content}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}
