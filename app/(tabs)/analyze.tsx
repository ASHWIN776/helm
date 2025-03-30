import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import AnalyzeInput from "@/components/analyze-input";
import AnalyzeIntro from "@/components/analyze-intro";
import { theme } from "@/theme";
import AnalysisResult from "@/components/analysis-result";

export default function Analyze() {
  const [message, setMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");

  const handleSubmit = () => {
    if (!message) return;
    setSubmittedMessage(message);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      {submittedMessage ? <AnalysisResult /> : <AnalyzeIntro />}
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
