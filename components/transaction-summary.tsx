import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/utils/theme";
import { formatCurrency } from "@/utils/helpers";

type TransactionSummaryProps = {
  type: "statement" | "receipt" | "text";
  summaryData: {
    income?: number;
    expense?: number;
    total?: number;
  };
  merchant?: string;
  onMerchantChange?: (merchant: string) => void;
};

export function TransactionSummary({
  type,
  summaryData,
  merchant,
  onMerchantChange,
}: TransactionSummaryProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editedMerchant, setEditedMerchant] = useState(merchant || "");

  const handleSave = () => {
    if (onMerchantChange) {
      onMerchantChange(editedMerchant);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.summaryContainer}>
      {merchant ? (
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Shop</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.summaryValue}>{merchant}</Text>
            {onMerchantChange && (
              <TouchableOpacity
                onPress={() => {
                  setEditedMerchant(merchant || "");
                  setModalVisible(true);
                }}
                style={{ marginLeft: 6 }}
                accessibilityLabel="Edit Shop Name"
              >
                <MaterialCommunityIcons
                  name="pencil"
                  size={18}
                  color={theme.colors.text.secondary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : null}
      {type === "statement" || type === "text" ? (
        <View style={styles.summaryContent}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Cash Inflow</Text>
            <Text style={[styles.summaryValue, styles.inflowText]}>
              {formatCurrency(summaryData.income || 0)}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Cash Outflow</Text>
            <Text style={[styles.summaryValue, styles.outflowText]}>
              {formatCurrency(summaryData.expense || 0)}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.summaryContent}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={[styles.summaryValue, styles.totalText]}>
              {formatCurrency(summaryData.total || 0)}
            </Text>
          </View>
        </View>
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalSheetContainer}>
          <View style={styles.formSection}>
            <Text style={styles.label}>Shop Name</Text>
            <TextInput
              style={styles.textInput}
              value={editedMerchant}
              onChangeText={setEditedMerchant}
              placeholder="Enter shop name"
              placeholderTextColor={theme.colors.text.secondary}
              autoFocus
              onSubmitEditing={handleSave}
              submitBehavior="submit"
              returnKeyType="send"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.gray,
    borderRadius: 12,
    padding: theme.spacing.md,
    rowGap: theme.spacing.md,
  },
  summaryContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  inflowText: {
    color: theme.colors.green,
  },
  outflowText: {
    color: theme.colors.red,
  },
  totalText: {
    color: theme.colors.text.primary,
  },
  modalSheetContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    justifyContent: "space-between",
  },
  formSection: {
    rowGap: 8,
    marginBottom: theme.spacing.lg,
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
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.sm,
    fontSize: 16,
    backgroundColor: theme.colors.white,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.white,
  },
});
