import { describe, expect, it } from "vitest";
import { signup } from "../src/signup";
import { getAccount } from "../src/get-account";

describe("Passenger account", () => {
  it("should create an passenger account", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@mail.com`,
      cpf: "97456321558",
      isPassenger: true,
    };
    const outputSignup = await signup(input);
    expect(outputSignup.accountId).toBeDefined();
    const outputGetAccount = await getAccount(outputSignup.accountId);
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
    await expect(() => signup(input)).rejects.toThrow(
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
    await expect(() => signup(input)).rejects.toThrow(
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
    await expect(() => signup(input)).rejects.toThrow(new Error("Invalid CPF"));
  });
  it("should not create an passenger if account already exists", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      isPassenger: true,
    };
    await signup(input);
    await expect(() => signup(input)).rejects.toThrow(
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
    const outputSignup = await signup(input);
    expect(outputSignup.accountId).toBeDefined();
    const outputGetAccount = await getAccount(outputSignup.accountId);
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
    await expect(() => signup(input)).rejects.toThrow(
      new Error("Invalid car plate")
    );
  });
});
