import React, { useState, useEffect } from 'react';
import { styles } from './MapForm.styles';
import { Modal } from '../../../Shared';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

type MapFormProps = {
  show: boolean;
  close: () => void;
  formik: any;
};

export function MapForm({ show, close, formik }: MapFormProps) {
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

      const locationCurrent = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationCurrent.coords.latitude,
        longitude: locationCurrent.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);

  const saveLocation = () => {
    console.log(location, 'location');
    formik.setFieldValue('location', location);
    close();
  };

  return (
    <Modal show={show} close={close}>
      <MapView
        initialRegion={location}
        showsUserLocation={true}
        onRegionChange={locationTemp => setLocation(locationTemp)}
        style={styles.map}>
        <Marker draggable={true} coordinate={location} />
      </MapView>
      <View style={styles.mapActions}>
        <Button
          title="Guardar"
          onPress={saveLocation}
          containerStyle={styles.btnMapContainerSave}
          buttonStyle={styles.btnMapSave}
        />
        <Button
          title="Cerrar"
          onPress={close}
          containerStyle={styles.btnMapContainerCancel}
          buttonStyle={styles.btnMapCancel}
        />
      </View>
    </Modal>
  );
}
