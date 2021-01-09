import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, title, value }: Request): Transaction {
    const transaction = this.transactionsRepository.create(type, title, value);

    const balance = this.transactionsRepository.getBalance();
    if (transaction.type === 'outcome' && transaction.value > balance.total) {
      throw Error('No balance for this transaction');
    }

    return transaction;
  }
}

export default CreateTransactionService;
