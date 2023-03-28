import React from 'react';
import { View } from 'react-native';
import { styles } from './ImageRestaurant.styles';
import { Image } from 'react-native-elements';

type ImageRestaurantProps = {
  images: string[];
};

export function ImageRestaurant({ images }: ImageRestaurantProps) {
  const pricipalImage = images[0];
  const defaultImage = require('../../../../../assests/img/5-tenedores-letras-icono-logo.png');

  return (
    <View style={styles.content}>
      <Image
        source={pricipalImage ? { uri: pricipalImage } : defaultImage}
        style={styles.image}
      />
    </View>
  );
}
