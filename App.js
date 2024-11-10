import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "We need access to your photos to select an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleNewPhoto = () => {
    setSelectedImage(null);
    openImagePicker();
  }

  return (
    <View style={styles.container}>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Text style={styles.header}>Here's your picture!</Text>
          <Image
            source={{ uri: selectedImage }}
            style={styles.image}
          />
          <Button style={styles.chooseAnother} title="Choose Another" onPress={() => handleNewPhoto()} />
        </View>
      )}
      {!selectedImage && (
        <View style={styles.optionsContainer}>
          <Button title="Choose from Device" onPress={openImagePicker} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#000',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 650,
    resizeMode: 'center',
    marginBottom: 20,
  },
  chooseAnother: {
    marginTop: 40,
  },
});