import crypto from "crypto";
import { validateCpf } from "./validate-cpf";
import AccountDAO from "./accountDAO";

export async function signup(input: any): Promise<any> {
  const accountDAO = new AccountDAO();
  input.account_id = crypto.randomUUID();
  const existingAccount = await accountDAO.getByEmail(input.email);
  if (existingAccount) throw new Error("Account already exists");
  if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name");
  if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid e-mail");
  if (!validateCpf(input.cpf)) throw new Error("Invalid CPF");
  if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/))
    throw new Error("Invalid car plate");
  await accountDAO.save(input);
  return {
    accountId: input.account_id,
  };
}
