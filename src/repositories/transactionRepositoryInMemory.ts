import { ITransaction, ITransactionRepository } from "../useCases/interfaces";

export class TransactionRepositoryInMemory implements ITransactionRepository {
    transactions!: ITransaction[];

    constructor() {
        this.transactions = [];
    }

    async getAll(): Promise<ITransaction[]> {
        return Promise.resolve(this.transactions);
    }

    async create(transaction: ITransaction): Promise<ITransaction> {
        this.transactions.push(transaction);
        return Promise.resolve(transaction);
    }
}