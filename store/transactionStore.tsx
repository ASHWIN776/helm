import { Transaction, UnsavedTransaction } from "@/utils/types";
import { create } from "zustand";

interface TransactionStore {
  transactions: Transaction[];
  addBulkTransactions: (transactions: UnsavedTransaction[]) => void;
  editTransaction: (id: string, updatedTransaction: Transaction) => void;
  editTransactionDescriptions: (
    items: { original: string; edited: string }[],
  ) => void;
  clearStore: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  addBulkTransactions: (transactions: UnsavedTransaction[]) =>
    set(() => ({
      transactions: transactions.map((transaction, index) => ({
        ...transaction,
        id: (index + 1).toString(),
      })),
    })),
  editTransaction: (id: string, updatedTransaction: Transaction) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === id ? updatedTransaction : transaction,
      ),
    })),
  editTransactionDescriptions: (
    items: { original: string; edited: string }[],
  ) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) => {
        const item = items.find(
          (item) => item.original === transaction.description,
        );
        return item
          ? { ...transaction, description: item.edited }
          : transaction;
      }),
    })),
  clearStore: () => set({ transactions: [] }),
}));
