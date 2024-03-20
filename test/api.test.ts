import axios from "axios";
import { describe, expect, it } from "vitest";

describe.skip("API", async () => {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@mail.com`,
    cpf: "97456321558",
    isPassenger: true,
  };

  const response = await axios.post("http://localhost:3333/signup", input);
  const outputSignup = response.data;
  expect(outputSignup.accountId).toBeDefined();

  const responseGetAccount = await axios.get(
    `http://localhost:3333/accounts/${outputSignup.accountId}`
  );
  const outputGetAccount = responseGetAccount.data;

  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
  expect(outputGetAccount.is_passenger).toBe(input.isPassenger);
});
