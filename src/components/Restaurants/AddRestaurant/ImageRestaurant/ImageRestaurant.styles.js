import { StyleSheet, Dimensions } from 'react-native';

const widthScreen = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  content: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: widthScreen,
  },
});
