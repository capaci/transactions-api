import { BalancesByStatus, IPayable, IPayableRepository } from "../useCases/interfaces";

export class PayableRepositoryInMemory implements IPayableRepository {
    payables!: IPayable[];

    constructor() {
        this.payables = [];
    }

    async getBalancesByStatus(): Promise<BalancesByStatus> {
        const balancesByStatus: BalancesByStatus = {
            waiting_funds: 0,
            paid: 0
        };

        this.payables.forEach(payable => {
            balancesByStatus[payable.status] += payable.amount;
        });

        return Promise.resolve(balancesByStatus);
    }
    
    async create(payable: Omit<IPayable, 'id'>): Promise<IPayable> {
        const newPayable = {id: this.payables.length + 1, ...payable};
        this.payables.push(newPayable);
        return Promise.resolve(newPayable);
    }
}