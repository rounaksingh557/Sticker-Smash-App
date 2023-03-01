import { StyleSheet, Image } from 'react-native';

/**
 * @param {*} placeholderImageSource : The default image used by the app.
 * @param {*} selectedImage : The image passed by the ImagePickerResult as selected by the user.
 * @returns A image component with a default image, but can be changed.
 */

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage !== null
        ? { uri: selectedImage }
        : placeholderImageSource;

    return (
        <Image source={imageSource} style={styles.image} />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});
