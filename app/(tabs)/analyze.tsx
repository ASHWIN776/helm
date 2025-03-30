import { StyleSheet, Text, View } from "react-native";

export default function Analyze() {
  return (
    <View style={styles.container}>
      <Text>Analyze</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
