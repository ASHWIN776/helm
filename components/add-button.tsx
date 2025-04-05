import { theme } from "@/utils/theme";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View, Animated } from "react-native";
import { useState, useRef } from "react";

type AnimatedOptionProps = {
  label: string;
  href: `/new?type=${string}`;
  icon: keyof typeof AntDesign.glyphMap;
  style: any;
  labelStyle: any;
};

const AnimatedOption = ({
  label,
  href,
  icon,
  style,
  labelStyle,
}: AnimatedOptionProps) => (
  <Animated.View style={[styles.option, style]}>
    <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
    <Link href={href} asChild>
      <Pressable style={styles.button}>
        <AntDesign name={icon} size={24} color={theme.colors.primary} />
      </Pressable>
    </Link>
  </Animated.View>
);

export const AddButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    setIsOpen(!isOpen);
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

  const options: AnimatedOptionProps[] = [
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
        <AnimatedOption key={option.label} {...option} />
      ))}

      <Pressable style={styles.add} onPress={toggleMenu}>
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
    bottom: 16,
    right: 16,
    alignItems: "center",
    zIndex: 1,
  },
  add: {
    zIndex: 2,
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
    fontSize: 14,
    width: 130,
    textAlign: "right",
    fontWeight: "500",
  },
});
