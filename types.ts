export type TransactionType = "expense" | "income";

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  description: string;
  type: TransactionType;
};
