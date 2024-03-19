import pgp from "pg-promise";

export interface AccountDAO {
  save(account: any): Promise<void>;
  getByEmail(email: string): Promise<void>;
  getById(accountId: string): Promise<void>;
}

export class AccountDAODatabase implements AccountDAO {
  async save(account: any) {
    const connection = pgp()(
      "postgres://postgres:postgres@localhost:5432/call_rider"
    );
    await connection.query(
      "insert into call_rider.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        account.account_id,
        account.name,
        account.email,
        account.cpf,
        account.carPlate,
        Boolean(account.isPassenger),
        Boolean(account.isDriver),
      ]
    );
    await connection.$pool.end();
  }

  async getByEmail(email: string) {
    const connection = pgp()(
      "postgres://postgres:postgres@localhost:5432/call_rider"
    );
    const [account] = await connection.query(
      "select * from call_rider.account where email = $1",
      [email]
    );
    await connection.$pool.end();
    return account;
  }

  async getById(accountId: string) {
    const connection = pgp()(
      "postgres://postgres:postgres@localhost:5432/call_rider"
    );
    const [acc] = await connection.query(
      "select * from call_rider.account where account_id = $1",
      [accountId]
    );
    await connection.$pool.end();
    return acc;
  }
}

export class AccountDAOInMemory implements AccountDAO {
  accounts = [];

  async save(account: any): Promise<void> {
    this.accounts.push(account);
  }
  async getByEmail(email: string): Promise<void> {
    return this.accounts.find((account) => (account.email = email));
  }
  async getById(accountId: string): Promise<void> {
    return this.accounts.find((account) => (account.accountId = accountId));
  }
}