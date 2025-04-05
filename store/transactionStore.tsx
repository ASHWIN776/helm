import { Transaction, UnsavedTransaction } from "@/utils/types";
import { create } from "zustand";

interface TransactionStore {
  transactions: Transaction[];
  addBulkTransactions: (transactions: UnsavedTransaction[]) => void;
  editTransaction: (id: string, updatedTransaction: Transaction) => void;
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
  clearStore: () => set({ transactions: [] }),
}));
