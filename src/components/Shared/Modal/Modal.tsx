import React from 'react';
import {Overlay} from 'react-native-elements';
import {styles} from './Modal.styles';

type ModalProps = {
  show: boolean;
  close: () => void;
  children: React.ReactNode;
};

export function Modal(props: ModalProps) {
  const {show, close, children} = props;
  return (
    <Overlay
      isVisible={show}
      overlayStyle={styles.overlay}
      onBackdropPress={close}>
      {children}
    </Overlay>
  );
}
