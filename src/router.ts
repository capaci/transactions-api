import { Router, Request, Response } from "express";
import { PayableRepositoryInMemory } from "./repositories/payableRepositoryInMemory";
import { TransactionRepositoryInMemory } from "./repositories/transactionRepositoryInMemory";
import { CreateTransaction } from "./useCases/createTransaction";
import { IInputTransaction } from "./useCases/interfaces";
import { ListTransactions } from "./useCases/listTransactions";

const router = Router();

const transactionRepository = new TransactionRepositoryInMemory();
const payableRepository = new PayableRepositoryInMemory();

const listTransactionUC = new ListTransactions(transactionRepository);
const createTransactionUC = new CreateTransaction(transactionRepository, payableRepository);

router.get('/transactions', async (req: Request, res: Response) => {
    const transactions = await listTransactionUC.execute();
    res.json(transactions);
})

router.post('/transactions', async (req: Request, res: Response) => {
    const transactionDate = new Date(req.body.date);
    const transaction: IInputTransaction = { ...req.body, date: transactionDate };

    const result = await createTransactionUC.execute(transaction);

    res.json(result);
})

router.get('/balance', async (req: Request, res: Response) => {
    const result = await payableRepository.getBalancesByStatus();

    res.json(result);
})

export default router;