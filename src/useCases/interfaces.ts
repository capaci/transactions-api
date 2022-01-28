export type PaymentMethod = 'debit_card' | 'credit_card';

export interface ITransaction {
    id: number;
    amount: number;
    date: Date;
    description: string;
    method: PaymentMethod;
    card_number: string;
    card_owner_name: string;
    card_expiration_date: string;
    card_cvv: string;
}

export type PayableStatus = 'waiting_funds' | 'paid';

export interface IPayable {
    status: PayableStatus;
    payment_date: Date;
}


export interface ITransactionRepository {
    transactions: ITransaction[];

    getAll(): Promise<ITransaction[]>;
    create(transaction: ITransaction): Promise<ITransaction>;
}
