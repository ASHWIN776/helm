import { useTransactionStore } from "@/store/transactionStore";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { theme } from "@/utils/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Transaction } from "@/utils/types";
import { useState } from "react";
import { useRouter } from "expo-router";

type DescriptionItem = {
  original: string;
  edited: string;
};

const extractUniqueDescriptions = (transactions: Transaction[]) => {
  const descriptions = new Set(transactions.map((tx) => tx.description));
  return Array.from(descriptions).map((desc) => ({
    original: desc,
    edited: desc,
  }));
};

export default function ConfirmName() {
  const transactions = useTransactionStore((state) => state.transactions);
  const setTransactionDescriptions = useTransactionStore(
    (state) => state.editTransactionDescriptions,
  );
  const [descriptionItems, setDescriptionItems] = useState<DescriptionItem[]>(
    extractUniqueDescriptions(transactions),
  );
  const router = useRouter();

  const handleDescriptionChange = (originalDesc: string, newDesc: string) => {
    setDescriptionItems((prev) =>
      prev.map((item) =>
        item.original === originalDesc ? { ...item, edited: newDesc } : item,
      ),
    );
  };

  const renderItem = ({ item }: { item: DescriptionItem }) => (
    <View style={styles.card}>
      <Text style={styles.label} numberOfLines={1}>
        {item.original}
      </Text>
      <TextInput
        style={styles.input}
        value={item.edited || ""}
        onChangeText={(text) => handleDescriptionChange(item.original, text)}
        placeholder="Enter new description"
        placeholderTextColor={theme.colors.text.secondary}
      />
    </View>
  );

  if (transactions.length === 0) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.white,
        }}
      >
        <Text style={styles.message}>
          No transactions found. Upload a file first.
        </Text>
      </SafeAreaView>
    );
  }

  const handleSubmit = () => {
    setTransactionDescriptions(descriptionItems);
    router.push("/confirm-transactions?type=statement");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <MaterialCommunityIcons
              name="text-box-outline"
              size={24}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Give each transaction a clear, concise name that helps us
              understand it.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={descriptionItems}
          renderItem={renderItem}
          estimatedItemSize={100}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.contentContainer}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary + "08",
    borderRadius: 16,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + "20",
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: theme.spacing.md,
    gap: theme.spacing.lg,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  listContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  message: {
    padding: theme.spacing.md,
    fontSize: 16,
    textAlign: "center",
    color: theme.colors.text.secondary,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.card.border,
  },
  separator: {
    height: theme.spacing.sm,
  },
  label: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.card.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: theme.colors.white,
    color: theme.colors.text.primary,
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
