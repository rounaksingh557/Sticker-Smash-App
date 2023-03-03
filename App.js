import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

// Local Components
import Button from "./Components/Button";
import ImageViewer from "./Components/ImageViewer";
import IconButton from "./Components/IconButton";
import CircleButton from "./Components/CircleButton";
import EmojiPicker from "./Components/EmojiPicker";
import EmojiList from "./Components/EmojiList";
import EmojiSticker from "./Components/EmojiSticker";

// Default Image Path
const PlaceholderImage = require("./assets/images/background-image.png");

/**
 * @returns The ImagePicker Screen of App. Also this is the main screen of our app.
 * See [Expo Guide to create this app.](https://docs.expo.dev/tutorial/introduction/)
 */
export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickerEmoji, setPickerEmoji] = useState(null);

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    return null;
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

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
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
        {pickerEmoji !== null ? (
          <EmojiSticker imageSize={40} stickerSource={pickerEmoji} />
        ) : null}
      </View>
      {showAppOptions ? (
        <View style={styles.optionContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickerEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
