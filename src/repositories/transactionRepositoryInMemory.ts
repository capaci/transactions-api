import { ITransaction, ITransactionRepository } from "../useCases/interfaces";

export class TransactionRepositoryInMemory implements ITransactionRepository {
    transactions!: ITransaction[];

    constructor() {
        this.transactions = [];
    }

    async getAll(): Promise<ITransaction[]> {
        return Promise.resolve(this.transactions);
    }

    async create(transaction: Omit<ITransaction, 'id'>): Promise<ITransaction> {
        const newTransaction = {id: this.transactions.length + 1, ...transaction};
        this.transactions.push(newTransaction);
        return Promise.resolve(newTransaction);
    }
}