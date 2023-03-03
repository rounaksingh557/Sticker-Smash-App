import { View, Image } from "react-native";

/**
 * @param {*} imageSize: The size of the emoji.
 * @param {*} stickerSource: The path of the emoji.
 * @returns An emoji.
 */

export default function EmojiSticker({ imageSize, stickerSource }) {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
