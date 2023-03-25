import {Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements/';
import {screen} from '../../../utils/screenName';
import {useNavigation} from '@react-navigation/native';
import {styles} from './Restaurant.styles';

//firebase
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';

export function Restaurant() {
  // la navigation tb se recibe desde props si estan en el mismo stack, siempre se usan con Screens
  //const { navigation } = props;
  const navigation = useNavigation();

  //vamos a renderizar el boton de agregar restaurante solo si el usuario esta logueado
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
  }, []);

  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.addRestaurant as never);
  };

  return (
    <View style={styles.content}>
      <Text>Screen Restaurant</Text>

      {currentUser && (
        <Icon
          reverse
          name="plus"
          type="material-community"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurant}
        />
      )}
    </View>
  );
}
