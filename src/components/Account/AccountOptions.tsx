import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { Modal } from '../../components';
import { ChangeDisplayNameForm } from './ChangeDisplayNameForm';
import { ChangeDisplayEmailForm } from './ChangeDisplayEmailForm';
import { ChangePasswordForm } from './ChangePasswordForm';

type AccountOptionsProps = {
  reload: () => void;
};

export function AccountOptions({ reload }: AccountOptionsProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [renderComponent, setRenderComponent] = useState<JSX.Element | null>(
    null,
  );

  const onCloseOpenModal = () => {
    setShowModal(prev => !prev);
  };

  const selectedComponent = (key: string) => {
    if (key === 'displayName') {
      setRenderComponent(
        <ChangeDisplayNameForm onClose={onCloseOpenModal} onReload={reload} />,
      );
    }
    if (key === 'email') {
      setRenderComponent(
        <ChangeDisplayEmailForm onClose={onCloseOpenModal} onReload={reload} />,
      );
    }
    if (key === 'password') {
      setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal} />);
    }
    onCloseOpenModal();
  };

  const menuOptions = getMenuOptions(selectedComponent);
  return (
    <View>
      {menuOptions.map(
        (
          {
            title,
            iconType,
            iconNameLeft,
            iconColorLeft,
            iconNameRight,
            iconColorRight,
            onPress,
          },
          index,
        ) => (
          <ListItem key={index} bottomDivider={true} onPress={onPress}>
            <Icon type={iconType} name={iconNameLeft} color={iconColorLeft} />

            <ListItem.Content>
              <ListItem.Title>{title}</ListItem.Title>
            </ListItem.Content>

            <Icon type={iconType} name={iconNameRight} color={iconColorRight} />
          </ListItem>
        ),
      )}

      <Modal show={showModal} close={onCloseOpenModal}>
        <Text>{renderComponent}</Text>
      </Modal>
    </View>
  );
}

type SelectedComponent = (key: string) => void;
function getMenuOptions(selectedComponent: SelectedComponent) {
  return [
    {
      title: 'Cambiar Nombre y Apellidos',
      iconType: 'material-community',
      iconNameLeft: 'account-circle',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => selectedComponent('displayName'),
    },
    {
      title: 'Cambiar Email',
      iconType: 'material-community',
      iconNameLeft: 'at',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => selectedComponent('email'),
    },
    {
      title: 'Cambiar Contraseña',
      iconType: 'material-community',
      iconNameLeft: 'lock-reset',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => selectedComponent('password'),
    },
  ];
}
