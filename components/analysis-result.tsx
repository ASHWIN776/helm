import { AnalysisResponse } from "@/utils/types";
import { ScrollView, StyleSheet, Text } from "react-native";

interface Props {
  data: AnalysisResponse;
}

export default function AnalysisResult({ data }: Props) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.submittedMessage}>{data.message}</Text>
      <Text style={styles.submittedMessage}>{data.thinking.sql}</Text>
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
