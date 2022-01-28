export type PaymentMethod = 'debit_card' | 'credit_card';

export interface IInputTransaction {
    amount: number;
    date: Date;
    description?: string;
    method: PaymentMethod;
    card_number: string;
    card_owner_name: string;
    card_expiration_date: string;
    card_cvv: string;
}

export interface ITransaction extends IInputTransaction {
    id: number;
    fee: number;
}

export type PayableStatus = 'waiting_funds' | 'paid';

export interface IPayable {
    status: PayableStatus;
    paymentDate: Date;
    amount: number;
}


export interface ITransactionRepository {
    transactions: ITransaction[];

    getAll(): Promise<ITransaction[]>;
    create(transaction: Omit<ITransaction, 'id'>): Promise<ITransaction>;
}

export type BalancesByStatus = {
    [key in PayableStatus]: number;
}

export interface IPayableRepository {
    payables: IPayable[];

    getBalancesByStatus(): Promise<BalancesByStatus>;
    create(payable: Omit<IPayable, 'id'>): Promise<IPayable>;
}
