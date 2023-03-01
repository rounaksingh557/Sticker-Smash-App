import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Local Components
import Button from './Components/Button';
import ImageViewer from './Components/ImageViewer';

// Default Image Path
const PlaceholderImage = require('./assets/images/background-image.png')

/**
 * @returns The ImagePicker Screen of App. Also this is the main screen of our app.
 * See [Expo Guide to create this app.](https://docs.expo.dev/tutorial/introduction/)
 */
export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  /**
   * Enables the app to pick an image from the user platform.
   * @returns assets array as ImagePickerResult.
   */
  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3.5,
    alignItems: 'center',
  }
});
