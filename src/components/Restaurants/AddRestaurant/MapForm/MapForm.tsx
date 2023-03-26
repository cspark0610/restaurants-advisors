import React, { useState, useEffect } from 'react';
import { styles } from './MapForm.styles';
import { Modal } from '../../../Shared';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';
import MapView, { Marker } from 'react-native-maps';

type MapFormProps = {
  show: boolean;
  close: () => void;
};

export function MapForm({ show, close }: MapFormProps) {
  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Toast.show({
          type: 'info',
          position: 'bottom',
          text1: 'Tienes que ir a ajustes de la app y activar la localizacion',
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      console.log(location, 'location2222');
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();

    //console.log(location, 'location');
  }, []);

  return (
    <Modal show={show} close={close}>
      <MapView
        initialRegion={location}
        showsUserLocation={true}
        onRegionChange={locationTemp => setLocation(locationTemp)}
        style={styles.map}>
        <Marker draggable={true} coordinate={location} />
      </MapView>
    </Modal>
  );
}
