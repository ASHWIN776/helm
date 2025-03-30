import { ScrollView, StyleSheet, Text } from "react-native";

export default function AnalysisResult() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.submittedMessage}>Result</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  },
  submittedMessage: {
    fontSize: 18,
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
  },
});
