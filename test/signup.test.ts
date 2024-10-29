import { describe, expect, it } from "vitest";
import { getAccount, signup } from "@/signup.ts";

describe("Sign Up", () => {
  describe("Passenger", () => {
    it("should create passager account", async () => {
      const input = {
        name: "John Doe",
        email: `john.doe-${Math.random()}@gmail.com`,
        cpf: "87748248800",
        isPassanger: true,
      };
      const outputSignup = await signup(input);
      expect(outputSignup.accountId).toBeDefined();
      const outputGetAccout = await getAccount(outputSignup.accountId);
      expect(outputGetAccout.name).toBe(input.name);
      expect(outputGetAccout.email).toBe(input.email);
      expect(outputGetAccout.cpf).toBe(input.cpf);
    });
    it("should not create passager account with invalid name", async () => {
      const input = {
        name: "",
        email: `john.doe-${Math.random()}@gmail.com`,
        cpf: "87748248800",
        isPassanger: true,
      };
      const output = await signup(input);
      expect(output).toBe(-3);
    });
    it("should not create passager account with invalid email", async () => {
      const input = {
        name: "John Doe",
        email: `john.doe-${Math.random()}`,
        cpf: "87748248800",
        isPassanger: true,
      };
      const output = await signup(input);
      expect(output).toBe(-2);
    });
    it("should not create passager account with invalid cpf", async () => {
      const input = {
        name: "John Doe",
        email: `john.doe-${Math.random()}@gmail.com`,
        cpf: "87748248801",
        isPassanger: true,
      };
      const output = await signup(input);
      expect(output).toBe(-1);
    });
    it("should not create passager account with duplicated email", async () => {
      const input = {
        name: "John Doe",
        email: `john.doe-${Math.random()}@gmail.com`,
        cpf: "87748248800",
        isPassanger: true,
      };
      await signup(input);
      const output = await signup(input);
      expect(output).toBe(-4);
    });
  });
  describe("Driver", () => {
    it("should not create driver account", async () => {
      const input = {
        name: "John Doe",
        email: `john.doe-${Math.random()}@gmail.com`,
        cpf: "87748248800",
        carPlate: "ABC1234",
        isDriver: true,
      };
      const outputSignup = await signup(input);
      expect(outputSignup.accountId).toBeDefined();
      const outputGetAccout = await getAccount(outputSignup.accountId);
      expect(outputGetAccout.name).toBe(input.name);
      expect(outputGetAccout.email).toBe(input.email);
      expect(outputGetAccout.cpf).toBe(input.cpf);
      expect(outputGetAccout.car_plate).toBe(input.carPlate);
    });
    it("should not create driver account with invalid car plate", async () => {
      const input = {
        name: "John Doe",
        email: `john.doe-${Math.random()}@gmail.com`,
        cpf: "87748248800",
        carPlate: "ABC123",
        isDriver: true,
      };
      const output = await signup(input);
      expect(output).toBe(-5);
    });
  });
});
