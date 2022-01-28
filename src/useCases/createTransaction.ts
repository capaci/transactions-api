import { ITransaction, ITransactionRepository } from "./interfaces";


export class CreateTransaction {
    private transactionRepository!: ITransactionRepository;

    constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository
    }
    
    async execute(transaction: Omit<ITransaction, 'id'>): Promise<ITransaction> {
        return this.transactionRepository.create(transaction)
    }
}
