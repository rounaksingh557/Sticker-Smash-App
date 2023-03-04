import { View, Image } from "react-native";
import {
  TapGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

// Animated the Image Component.
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

/**
 * @param {*} imageSize : The size of the sticker.
 * @param {*} stickerSource : The path of the sticker.
 * @returns A animated emoji sticker.
 */

export default function EmojiSticker({ imageSize, stickerSource }) {
  // Helps in scaling the image.
  const ScaleImage = useSharedValue(imageSize);

  // Settings the default value of translate to 0.
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  /**
   * Changes the value of translateX and translateY on gesture.
   */
  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  /**
   * The style to applied, which renders the gesture movement.
   */
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  /**
   * Helps in scaling the size of image.
   */
  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (ScaleImage.value) {
        ScaleImage.value = ScaleImage.value * 2;
      }
    },
  });

  /**
   * Updates the image style to perform spring animation when it is scaled.
   */
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(ScaleImage.value),
      height: withSpring(ScaleImage.value),
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
}
