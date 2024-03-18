import { beforeEach, describe, expect, it } from "vitest";
import { Signup } from "../src/signup";
import { GetAccount } from "../src/get-account";
import {
  AccountDAO,
  AccountDAODatabase,
  AccountDAOInMemory,
} from "../src/accountDAO";

let signup: Signup;
let getAccount: GetAccount;

beforeEach(() => {
  // const accountDAO = new AccountDAODatabase();
  const accountDAO = new AccountDAOInMemory();
  signup = new Signup(accountDAO);
  getAccount = new GetAccount(accountDAO);
});

describe("Passenger account", () => {
  it("should create an passenger account", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@mail.com`,
      cpf: "97456321558",
      isPassenger: true,
    };

    const outputSignup = await signup.execute(input);
    expect(outputSignup.accountId).toBeDefined();
    const outputGetAccount = await getAccount.execute(outputSignup.accountId);
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.is_passenger).toBe(input.isPassenger);
  });
  it("should not create an passenger with invalid name", async () => {
    const input = {
      name: "John",
      email: `john.doe${Math.random()}@mail.com`,
      cpf: "97456321558",
      isPassenger: true,
    };
    await expect(() => signup.execute(input)).rejects.toThrow(
      new Error("Invalid name")
    );
  });
  it("should not create an passenger with invalid email", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}`,
      cpf: "97456321558",
      isPassenger: true,
    };
    await expect(() => signup.execute(input)).rejects.toThrow(
      new Error("Invalid e-mail")
    );
  });
  it("should not create an passenger with invalid CPF", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "9745632155X",
      isPassenger: true,
    };
    await expect(() => signup.execute(input)).rejects.toThrow(
      new Error("Invalid CPF")
    );
  });
  it("should not create an passenger if account already exists", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      isPassenger: true,
    };
    await signup.execute(input);
    await expect(() => signup.execute(input)).rejects.toThrow(
      new Error("Account already exists")
    );
  });
});

describe("Driver account", () => {
  it("should create an driver account", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@mail.com`,
      cpf: "97456321558",
      carPlate: "AAA0000",
      isDriver: true,
    };

    const outputSignup = await signup.execute(input);
    expect(outputSignup.accountId).toBeDefined();
    const outputGetAccount = await getAccount.execute(outputSignup.accountId);
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.is_driver).toBe(input.isDriver);
  });
  it("should not create an driver with invalid car plate", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@mail.com`,
      cpf: "97456321558",
      carPlate: "AAA000",
      isDriver: true,
    };
    await expect(() => signup.execute(input)).rejects.toThrow(
      new Error("Invalid car plate")
    );
  });
});
