import { AccountDAO, AccountDAODatabase } from "./accountDAO";

export class GetAccount {
  constructor(readonly accountDAO: AccountDAO) {}

  async execute(accountId: string): Promise<any> {
    const account = await this.accountDAO.getById(accountId);
    account.isPassenger = account.is_passenger;
    account.isDriver = account.is_driver;
    return account;
  }
}
