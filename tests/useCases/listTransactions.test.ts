import { TransactionRepositoryInMemory } from "../../src/repositories/transactionRepositoryInMemory";
import { ListTransactions } from "../../src/useCases/listTransactions";
import fakeTransactions from "../data/transactions";


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

        let spy = jest.spyOn(transactionRepository, 'getAll').mockReturnValue(Promise.resolve(fakeTransactions));
        const listTransactionUC = new ListTransactions(transactionRepository);

        const result = await listTransactionUC.execute();

        expect(result).toEqual(fakeTransactions);

        spy.mockRestore()
    })
})