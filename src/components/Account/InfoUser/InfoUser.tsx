import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Avatar } from 'react-native-elements';
import { getAuth, User, UserInfo, updateProfile } from 'firebase/auth';
import { styles } from './InfoUser.styles';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

type InfoUserProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingText: React.Dispatch<React.SetStateAction<string>>;
};

export function InfoUser({ setLoading, setLoadingText }: InfoUserProps) {
  const user: User = getAuth().currentUser!;
  const { uid, displayName, email, photoURL } = user
    .providerData[0] as UserInfo;

  const [avatar, setAvatar] = useState(photoURL);

  const changeAvatar = async () => {
    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    if (!result.canceled) {
      const uri = result.assets![0].uri!;
      await uploadImageToFirebase(uri, uid);
    }
  };

  const uploadImageToFirebase = async (uri: string, _uid: string) => {
    setLoadingText('Actualizando avatar');
    setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${_uid}`);

    uploadBytes(storageRef, blob).then(snapshot => {
      updatePhotoUrl(snapshot.metadata.fullPath);
      console.log('Uploaded a blob or file!', snapshot.metadata);
    });
  };

  const updatePhotoUrl = async (imagePath: string) => {
    setLoading(false);
    const storage = getStorage();
    const imageRef: StorageReference = ref(storage, imagePath);
    const imageUrl: string = await getDownloadURL(imageRef);

    const currentUser = getAuth().currentUser;
    updateProfile(currentUser!, {
      photoURL: imageUrl,
    });

    setAvatar(imageUrl);
    setLoading(false);
  };

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: 'material', name: 'person' }}
        source={{ uri: avatar! }}>
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName ?? 'Anonimo'}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}
