import { sharedStyles, theme } from "@/utils/theme";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

interface Props {
  message: string;
  onChange: (message: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export default function AnalyzeInput({
  message,
  onChange,
  onSubmit,
  isLoading,
}: Props) {
  return (
    <KeyboardAvoidingView
      style={styles.inputContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={onChange}
        placeholder="Ask about your finances..."
        placeholderTextColor={theme.colors.text.secondary}
      />
      <TouchableOpacity
        disabled={isLoading}
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={onSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Go</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
    backgroundColor: theme.colors.white,
  },
  input: {
    ...sharedStyles.input,
    flex: 1,
    height: 46,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
