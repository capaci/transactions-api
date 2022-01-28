import { IInputTransaction, IPayableRepository, ITransaction, ITransactionRepository, PaymentMethod } from "./interfaces";


export class CreateTransaction {
    private transactionRepository!: ITransactionRepository;
    private payableRepository!: IPayableRepository;

    constructor(transactionRepository: ITransactionRepository, payableRepository: IPayableRepository) {
        this.transactionRepository = transactionRepository
        this.payableRepository = payableRepository
    }

    async execute(transaction: IInputTransaction): Promise<ITransaction> {
        transaction.card_number = transaction.card_number.slice(-4);

        const fee = this.getFee(transaction.method);
        const result = await this.transactionRepository.create({...transaction, fee});

        const paymentDate = this.getPaymentDate(transaction);
        const status = transaction.method === 'debit_card' ? 'paid' : 'waiting_funds';
        const amount = transaction.amount * (1.0 - fee);
        await this.payableRepository.create({status, paymentDate, amount});

        return result;
    }

    private getFee(transactionMethod: PaymentMethod): number {
        if (transactionMethod === 'debit_card') {
            return 0.03;
        }
        return 0.05;
    }

    private getPaymentDate(transaction: IInputTransaction): Date {
        if (transaction.method === 'debit_card') {
            return transaction.date;
        }

        const daysToAdd = 30;
        return new Date(transaction.date.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    }
}
