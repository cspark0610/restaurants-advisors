import { View } from 'react-native';
import React, { useState } from 'react';
import { InfoUser, AccountOptions } from '../../../components/Account';
import { Button } from 'react-native-elements';
import { styles } from './UserLogged.styles';
import { LoadingModal } from '../../../components/Shared';

import { getAuth, signOut } from 'firebase/auth';

export function UserLogged() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');

  // al cambiar el estado setReload, el cual se lo pasa por props al modal
  // se vuelve a renderizar el componente, y se genera el efecto de regarcar el componente
  const [_, setReload] = useState<boolean>(false);

  const reload = () => {
    setReload(prevState => !prevState);
  };

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

      <AccountOptions reload={reload} />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btn}
        titleStyle={styles.btnTitle}
        onPress={logout}
      />
      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
}
