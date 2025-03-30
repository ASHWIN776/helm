import { theme } from "@/theme";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export const AddButton = () => {
  return (
    <Link href="/new" asChild>
      <Pressable style={styles.add}>
        <AntDesign
          name="pluscircle"
          size={56}
          color={theme.colors.primary}
          style={styles.icon}
        />
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  add: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 1,
  },
  icon: {
    borderRadius: theme.spacing.xl,
    backgroundColor: theme.colors.card.background,
  },
});
