const CPF_LENGTH = 11;

export function validateCpf(rawCpf: string) {
  if (!rawCpf) return false;
  const cpf = removeNonDigits(rawCpf);
  if (hasInvalidLength(cpf)) return false;
  if (hasAllDigitsEqual(cpf)) return false;
  const firstDigit = calculateDigit(cpf, 10);
  const secondDigit = calculateDigit(cpf, 11);
  return extractDigit(cpf) == `${firstDigit}${secondDigit}`;
}

function removeNonDigits(cpf: string) {
  return cpf.replace(/\D/g, "");
}

function hasInvalidLength(cpf: string) {
  return cpf.length !== CPF_LENGTH;
}

function hasAllDigitsEqual(cpf: string) {
  const [firstCPFDigit] = cpf;
  return cpf.split("").every((digit) => digit === firstCPFDigit);
}

function extractDigit(cpf: string) {
  return cpf.slice(9);
}

function calculateDigit(cpf: string, factor: number) {
  let total = 0;
  for (const digit of cpf) {
    if (factor > 1) {
      total += parseInt(digit) * factor--;
    }
  }
  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
}
