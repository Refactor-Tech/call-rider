import { describe, expect, it } from "vitest";
import { validateCpf } from "../src/validate-cpf";

const validCPFs = ["97456321558", "71428793860", "87748248800"];
const invalidCPFs = ["8774824880", "00000000000", null, undefined];

describe("Validate CPF", () => {
  it.each(validCPFs)("should validate CPF: %s", (cpf: string) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBeTruthy();
  });
  it.each(invalidCPFs)("should test invalid CPF: %s", (cpf: any) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBeFalsy();
  });
});
