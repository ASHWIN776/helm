import { sharedStyles, theme } from "@/utils/theme";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
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
        multiline
        numberOfLines={3}
        placeholder="Ask about your finances"
        placeholderTextColor={theme.colors.text.secondary}
        editable={!isLoading}
        onSubmitEditing={onSubmit}
        submitBehavior="submit"
        returnKeyType="send"
      />
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
    height: 80,
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
