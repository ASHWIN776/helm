import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { authClient } from "../auth-client";
import { theme, sharedStyles } from "@/utils/theme";

export default function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await authClient.signUp.email({
      email,
      password,
      name,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View>
        <View style={styles.formSection}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[sharedStyles.input, styles.textInput]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={theme.colors.text.secondary}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>
        <View style={styles.formSection}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[sharedStyles.input, styles.textInput]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.text.secondary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.formSection}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[sharedStyles.input, styles.textInput]}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={theme.colors.text.secondary}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleLogin}
            activeOpacity={0.7}
          >
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: theme.colors.white,
  },
  formSection: {
    rowGap: 8,
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.text.primary,
    marginLeft: 4,
    marginBottom: 4,
  },
  textInput: {
    height: 46,
  },
  buttonRow: {
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
