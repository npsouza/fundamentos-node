import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (prev, curr) => {
        if (curr.type === 'outcome') {
          return {
            ...prev,
            outcome: prev.outcome + curr.value,
            total: prev.total - curr.value,
          };
        }

        if (curr.type === 'income') {
          return {
            ...prev,
            income: prev.income + curr.value,
            total: prev.total + curr.value,
          };
        }

        return prev;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }

  public create(
    type: 'income' | 'outcome',
    title: string,
    value: number,
  ): Transaction {
    const transaction = new Transaction({ type, title, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
