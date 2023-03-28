import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  viewImage: {
    flexDirection: 'row', // para que se acomoden los hijos en direccion horizontal de en fila
    marginHorizontal: 20,
    marginTop: 30,
  },
  containerIcon: {
    justifyContent: 'center', //alinear el contenido en sentido horizxontal
    marginRigth: 10,
    paddingRight: 10,
    backgroundColor: '#e3e3e3',
    width: 70,
    height: 70,
  },
  error: {
    color: '#fF0000',
    marginHorizontal: 20,
    marginTop: 10,
    fontSize: 12,
    paddingLeft: 10,
  },
  imageStyle: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
  },
});
