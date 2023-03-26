import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text, Overlay } from 'react-native-elements';
import { styles } from './LoadingModal.styles';

type LoadingModalProps = {
  show: boolean;
  text?: string;
};

LoadingModal.defaultProps = {
  show: false,
};

export function LoadingModal(props: LoadingModalProps) {
  const { show, text } = props;
  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#00a680" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Overlay>
  );
}
