import crypto from "crypto";
import { validateCpf } from "./validate-cpf";
import { AccountDAO, AccountDAODatabase } from "./accountDAO";

export class Signup {
  constructor(readonly accountDAO: AccountDAO) {}

  async execute(input: any) {
    input.account_id = crypto.randomUUID();
    const existingAccount = await this.accountDAO.getByEmail(input.email);
    if (existingAccount) throw new Error("Account already exists");
    if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/))
      throw new Error("Invalid name");
    if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid e-mail");
    if (!validateCpf(input.cpf)) throw new Error("Invalid CPF");
    if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/))
      throw new Error("Invalid car plate");
    await this.accountDAO.save(input);
    return {
      accountId: input.account_id,
    };
  }
}
