import { TransactionRepositoryInMemory } from "../../src/repositories/transactionRepositoryInMemory";
import { ITransaction } from "../../src/useCases/interfaces";
import { ListTransactions } from "../../src/useCases/listTransactions";

const transactions: ITransaction[] = [
    {
        id: 1,
        amount: 100,
        date: new Date(),
        description: 'Some description',
        method: 'debit_card',
        card_number: '1234123412341234',
        card_owner_name: 'John Doe',
        card_expiration_date: '12/2030',
        card_cvv: '123'
    },
    {
        id: 2,
        amount: 200,
        date: new Date(),
        description: 'Some description',
        method: 'credit_card',
        card_number: '2341234123412345',
        card_owner_name: 'John Doe',
        card_expiration_date: '11/2030',
        card_cvv: '321'                
    }
]


describe('Test transactions listing use case', () => {

    test('should return empty transactions', async () => {
        const transactionRepository = new TransactionRepositoryInMemory();
        let spy = jest.spyOn(transactionRepository, 'getAll').mockReturnValue(Promise.resolve([]));
        const listTransactionUC = new ListTransactions(transactionRepository);

        const result = await listTransactionUC.execute();

        expect(result.length).toBe(0);

        spy.mockRestore()
    })

    test('should return full list of transactions', async () => {
        const transactionRepository = new TransactionRepositoryInMemory();

        let spy = jest.spyOn(transactionRepository, 'getAll').mockReturnValue(Promise.resolve(transactions));
        const listTransactionUC = new ListTransactions(transactionRepository);

        const result = await listTransactionUC.execute();

        expect(result).toEqual(transactions);

        spy.mockRestore()
    })
})