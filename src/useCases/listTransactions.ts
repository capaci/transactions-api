import { ITransaction, ITransactionRepository } from "./interfaces";


export class ListTransactions {
    private transactionRepository!: ITransactionRepository;

    constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository
    }
    
    async execute(): Promise<ITransaction[]> {
        return this.transactionRepository.getAll()
    }
}
