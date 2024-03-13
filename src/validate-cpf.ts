function clean(cpf: string) {
  return cpf
    .replace(".", "")
    .replace(".", "")
    .replace("-", "")
    .replace(" ", "");
}

function hasInvalidLength(cpf: string) {
  return cpf.length !== 11;
}

function hasAllDigitEquals(cpf: string) {
  return cpf.split("").every((digit) => digit === cpf[0]);
}

function extractDigit(cpf: string) {
  return cpf.substring(cpf.length - 2, cpf.length);
}

export function validateCpf(cpf: string) {
  if (!cpf) return false;
  cpf = clean(cpf);
  if (hasInvalidLength(cpf)) return false;
  if (hasAllDigitEquals(cpf)) return false;
  let d1 = 0;
  let d2 = 0;
  for (let nCount = 1; nCount < cpf.length - 1; nCount++) {
    const digito = parseInt(cpf.substring(nCount - 1, nCount));
    d1 = d1 + (11 - nCount) * digito;
    d2 = d2 + (12 - nCount) * digito;
  }
  let rest = 0;
  let nDigResult;
  rest = d1 % 11;
  const dg1 = rest < 2 ? 0 : 11 - rest;
  d2 += 2 * dg1;
  rest = d2 % 11;
  const dg2 = rest < 2 ? 0 : 11 - rest;
  let nDigVerific = extractDigit(cpf);
  nDigResult = `${dg1}${dg2}`;
  return nDigVerific == nDigResult;
}
