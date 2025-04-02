import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import AnalyzeInput from "@/components/analyze-input";
import AnalyzeIntro from "@/components/analyze-intro";
import { theme } from "@/utils/theme";
import AnalysisResult from "@/components/analysis-result";
import { useAnalysis } from "@/hooks/useAnalysis";

export default function Analyze() {
  const [message, setMessage] = useState("");
  const [userQuery, setUserQuery] = useState("");

  const { data, isLoading, error } = useAnalysis(userQuery);

  const handleSubmit = async () => {
    if (!message) return;
    setUserQuery(message);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data ? <AnalysisResult data={data} /> : <AnalyzeIntro />}
      <AnalyzeInput
        message={message}
        onChange={setMessage}
        onSubmit={handleSubmit}
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
  },
});
