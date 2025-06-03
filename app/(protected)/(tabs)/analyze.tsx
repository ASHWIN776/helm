import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import AnalyzeInput from "@/components/analyze-input";
import AnalyzeIntro from "@/components/analyze-intro";
import { theme } from "@/utils/theme";
import AnalysisResult from "@/components/analysis-result";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Analyze() {
  const [message, setMessage] = useState("");
  const [userQuery, setUserQuery] = useState("");

  const { data, isLoading, error } = useAnalysis(userQuery);
  const navigation = useNavigation();

  const handleReset = useCallback(() => {
    setMessage("");
    setUserQuery("");
  }, []);

  // Dynamically set header button when analysis result is present
  useEffect(() => {
    if (data) {
      navigation.setOptions({
        headerRight: () => (
          <Pressable onPress={handleReset}>
            <Ionicons
              name="close-circle-outline"
              size={28}
              color={theme.colors.red}
              style={{ marginRight: 16 }}
            />
          </Pressable>
        ),
      });
    } else {
      navigation.setOptions({ headerRight: undefined });
    }
  }, [data, navigation, handleReset]);

  const handleSubmit = async () => {
    if (!message) return;
    setUserQuery(message);
  };

  const onSelectExamplePrompt = (message: string) => {
    setMessage(message);
    setUserQuery(message);
  };

  const showContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text>Error: {error.message}</Text>
        </View>
      );
    }
    return data ? (
      <AnalysisResult data={data} />
    ) : (
      <AnalyzeIntro onSelectPrompt={onSelectExamplePrompt} />
    );
  };

  return (
    <View style={styles.container}>
      {showContent()}
      <AnalyzeInput
        message={message}
        onChange={setMessage}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    paddingBottom: 20,
    paddingHorizontal: 16,
    rowGap: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
