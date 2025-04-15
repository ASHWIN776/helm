import { theme } from "@/utils/theme";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View, Animated } from "react-native";
import { useState, useRef } from "react";
import { useOverlayStore } from "@/store/overlayStore";

type AnimatedOptionProps = {
  label: string;
  href: `/new?type=${string}`;
  icon: keyof typeof AntDesign.glyphMap;
  style: any;
  labelStyle: any;
  setIsOpen: (value: boolean) => void;
};

const AnimatedOption = ({
  label,
  href,
  icon,
  style,
  labelStyle,
  setIsOpen,
}: AnimatedOptionProps) => {
  const { hide } = useOverlayStore();

  const router = useRouter();
  const onPress = () => {
    setIsOpen(false);
    router.push(href);
    hide();
  };

  return (
    <Animated.View style={[styles.option, style]}>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      <Pressable style={styles.button} onPress={onPress}>
        <AntDesign name={icon} size={24} color={theme.colors.primary} />
      </Pressable>
    </Animated.View>
  );
};

export const AddButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const { show, hide } = useOverlayStore();

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    setIsOpen(!isOpen);

    if (toValue === 1) {
      show();
    } else {
      hide();
    }

    Animated.spring(animation, {
      toValue,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const createAnimatedStyle = (translateY: number) => ({
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, translateY],
        }),
      },
    ],
    opacity: animation,
  });

  const labelStyle = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [20, -20],
        }),
      },
    ],
    opacity: animation,
  };

  const options: Omit<AnimatedOptionProps, "setIsOpen">[] = [
    {
      label: "Text",
      href: "/new?type=text",
      icon: "filetext1",
      style: createAnimatedStyle(-240),
      labelStyle,
    },
    {
      label: "Statement",
      href: "/new?type=statement",
      icon: "profile",
      style: createAnimatedStyle(-180),
      labelStyle,
    },
    {
      label: "Form",
      href: "/new?type=form",
      icon: "form",
      style: createAnimatedStyle(-120),
      labelStyle,
    },
    {
      label: "Receipt",
      href: "/new?type=receipt",
      icon: "filetext1",
      style: createAnimatedStyle(-60),
      labelStyle,
    },
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <AnimatedOption key={option.label} {...option} setIsOpen={toggleMenu} />
      ))}

      <Pressable onPress={toggleMenu}>
        <Animated.View
          style={[
            styles.icon,
            {
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <AntDesign name="pluscircle" size={56} color={theme.colors.primary} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    right: 16,
    alignItems: "center",
    zIndex: 999,
  },
  icon: {
    borderRadius: theme.spacing.xl,
    backgroundColor: theme.colors.card.background,
  },
  option: {
    position: "absolute",
    bottom: 8,
    right: 4,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.card.background,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    width: 130,
    textAlign: "right",
    fontWeight: "500",
    color: theme.colors.white,
  },
});
