import { ITransaction, ITransactionRepository } from "./interfaces";


export class CreateTransaction {
    private transactionRepository!: ITransactionRepository;

    constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository
    }
    
    async execute(transaction: Omit<ITransaction, 'id'>): Promise<ITransaction> {
        transaction.card_number = transaction.card_number.slice(-4);

        return this.transactionRepository.create(transaction)
    }
}
