import { TransactionRepositoryInMemory } from "../../src/repositories/transactionRepositoryInMemory";
import { ITransaction } from "../../src/useCases/interfaces";
import { CreateTransaction } from "../../src/useCases/createTransaction";
import fakeTransactions from "../data/transactions";

const inputTransaction: Omit<ITransaction, 'id'> = {
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
        const createTransactionUC = new CreateTransaction(transactionRepository);

        const result = await createTransactionUC.execute(inputTransaction);
        const { id, ...transaction } = result;
        expect(id).toBe(1);
        expect(transaction).toEqual(inputTransaction);
        expect(transactionRepository.transactions.length).toBe(1);
    })

    test('should append to existing transactions', async () => {
        const transactionRepository = new TransactionRepositoryInMemory();
        transactionRepository.transactions = [...fakeTransactions];

        const createTransactionUC = new CreateTransaction(transactionRepository);

        await createTransactionUC.execute(inputTransaction);

        
        const { id, ...transaction } = transactionRepository.transactions.slice(-1)[0];
        expect(transaction).toEqual(inputTransaction);
        expect(transactionRepository.transactions.length).toBe(fakeTransactions.length + 1);
    })
})