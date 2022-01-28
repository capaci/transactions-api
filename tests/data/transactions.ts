import { ITransaction } from "../../src/useCases/interfaces";

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
        card_cvv: '123',
        fee: 0.03
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
        card_cvv: '321',
        fee: 0.05
    }
]

export default transactions;
