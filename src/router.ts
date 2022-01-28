import { Router, Request, Response } from "express";
import { TransactionRepositoryInMemory } from "./repositories/transactionRepositoryInMemory";
import { CreateTransaction } from "./useCases/createTransaction";
import { ITransaction } from "./useCases/interfaces";
import { ListTransactions } from "./useCases/listTransactions";

const router = Router();

const transactionRepository = new TransactionRepositoryInMemory();
const listTransactionUC = new ListTransactions(transactionRepository);
const createTransactionUC = new CreateTransaction(transactionRepository);

router.get('/transactions', async (req: Request, res: Response) => {
    const transactions = await listTransactionUC.execute();
    res.json(transactions);
})

router.post('/transactions', async (req: Request, res: Response) => {
    const transaction: Omit<ITransaction, 'id'> = req.body;

    const result = await createTransactionUC.execute(transaction);

    res.json(result);
})

export default router;