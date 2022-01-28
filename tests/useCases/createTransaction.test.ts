import { TransactionRepositoryInMemory } from "../../src/repositories/transactionRepositoryInMemory";
import { IInputTransaction } from "../../src/useCases/interfaces";
import { CreateTransaction } from "../../src/useCases/createTransaction";
import fakeTransactions from "../data/transactions";
import { PayableRepositoryInMemory } from "../../src/repositories/payableRepositoryInMemory";

const inputTransaction: IInputTransaction = {
    amount: 100,
    date: new Date(),
    method: 'credit_card',
    card_number: '123456789',
    card_owner_name: 'John Doe',
    card_expiration_date: '12/2030',
    card_cvv: '123'
};

describe('Test create of transactions use case', () => {

    test('should return empty transactions', async () => {
        const transactionRepository = new TransactionRepositoryInMemory();
        const payableRepository = new PayableRepositoryInMemory();
        const createTransactionUC = new CreateTransaction(transactionRepository, payableRepository);

        const result = await createTransactionUC.execute(inputTransaction);
        const { id, fee, ...transaction } = result;
        expect(id).toBe(1);
        expect(transaction).toEqual(inputTransaction);
        expect(transactionRepository.transactions.length).toBe(1);
    })

    test('should append to existing transactions', async () => {
        const transactionRepository = new TransactionRepositoryInMemory();
        const payableRepository = new PayableRepositoryInMemory();
        transactionRepository.transactions = [...fakeTransactions];

        const createTransactionUC = new CreateTransaction(transactionRepository, payableRepository);

        await createTransactionUC.execute(inputTransaction);

        
        const { id, fee, ...transaction } = transactionRepository.transactions.slice(-1)[0];
        expect(transaction).toEqual(inputTransaction);
        expect(transactionRepository.transactions.length).toBe(fakeTransactions.length + 1);
    })
})