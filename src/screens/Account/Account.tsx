import React, {useState, useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {UserLogged} from './UserLogged';
import {UserGuest} from './UserGuest';
import {LoadingModal} from '../../components';

export function Account() {
  const [hasLogged, setHasLogged] = useState<null | boolean>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      setHasLogged(user ? true : false);
    });
    console.log(hasLogged, 'hasLogged');
    // con el array de dependencias vacio, el cb del useEffect se ejecuta cada vez que se monta el screen
  }, []);

  if (hasLogged === null) {
    return <LoadingModal show={true} text="Cargando..." />;
  }

  return hasLogged ? <UserLogged /> : <UserGuest />;
}
