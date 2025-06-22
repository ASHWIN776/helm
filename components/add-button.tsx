import { theme } from "@/utils/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View, Animated } from "react-native";
import { useRef, useEffect } from "react";
import { useOverlayStore } from "@/store/overlayStore";

type AnimatedOptionProps = {
  label: string;
  href: `/new?type=${string}`;
  icon: React.ReactNode;
  style: any;
  labelStyle: any;
};

const AnimatedOption = ({
  label,
  href,
  icon,
  style,
  labelStyle,
}: AnimatedOptionProps) => {
  const { hide } = useOverlayStore();

  const router = useRouter();
  const onPress = () => {
    router.push(href);
    hide();
  };

  return (
    <Animated.View style={[styles.option, style]}>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      <Pressable style={styles.button} onPress={onPress}>
        {icon}
      </Pressable>
    </Animated.View>
  );
};

export const AddButton = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const isVisibleOverlay = useOverlayStore((state) => state.isVisible);
  const { show, hide } = useOverlayStore();

  // Animate when overlay store changes
  useEffect(() => {
    Animated.spring(animation, {
      toValue: isVisibleOverlay ? 1 : 0,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, [animation, isVisibleOverlay]);

  const toggleMenu = () => {
    if (isVisibleOverlay) {
      hide();
    } else {
      show();
    }
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
      label: "Form",
      href: "/new?type=form",
      icon: <AntDesign name="form" size={24} color={theme.colors.primary} />,
      style: createAnimatedStyle(-240),
      labelStyle,
    },
    {
      label: "Statement",
      href: "/new?type=statement",
      icon: <AntDesign name="profile" size={24} color={theme.colors.primary} />,
      style: createAnimatedStyle(-180),
      labelStyle,
    },
    {
      label: "Receipt",
      href: "/new?type=receipt",
      icon: (
        <AntDesign name="filetext1" size={24} color={theme.colors.primary} />
      ),
      style: createAnimatedStyle(-120),
      labelStyle,
    },
    {
      label: "Text",
      href: "/new?type=text",
      icon: (
        <MaterialIcons name="message" size={24} color={theme.colors.primary} />
      ),
      style: createAnimatedStyle(-60),
      labelStyle,
    },
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <AnimatedOption key={option.label} {...option} />
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
