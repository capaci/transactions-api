import { Router, Request, Response } from "express";
import { TransactionRepositoryInMemory } from "./repositories/transactionRepositoryInMemory";

import { ListTransactions } from "./useCases/listTransactions";

const router = Router();

const transactionRepository = new TransactionRepositoryInMemory();
const listTransactionUC = new ListTransactions(transactionRepository);

router.get('/transactions', async (req: Request, res: Response) => {
    const transactions = await listTransactionUC.execute();
    res.json(transactions);
})

export default router;