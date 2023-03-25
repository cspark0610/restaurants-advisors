import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  content: {
    flex: 1, //ocupe todo el espacio disponible
    alignItems: 'center', //centrado vertical
    justifyContent: 'center', //centrado horizontal
    marginTop: 30,
  },
  input: {
    width: '100%', // que tome el 100% del ancho del padre (content)
    marginTop: 20,
  },
  icon: {
    color: '#c1c1c1',
  },
  btnContainer: {
    marginTop: 20,
    width: '95%',
  },
  btn: {
    backgroundColor: '#00a680',
  },
});
