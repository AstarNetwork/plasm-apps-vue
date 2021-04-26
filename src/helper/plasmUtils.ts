import BN from 'bn.js';

/**
 * A helper function to convert the given node balance value into the given chain token decimal point as a string.
 * EX: `femto` -> `PLM`
 * @param bal the account balance in the minimum denominator
 * @param decimal the decimal point it should convert to
 * @returns the reduced value in string number
 */
export const reduceBalanceToDenom = (bal: BN, decimal: number) => {
  const decPoint = new BN(10).pow(new BN(decimal));
  const formatted = bal.div(decPoint);
  return formatted.toString();
};

export const reduceDenomToBalance = (bal: number, decimal: number) => {
  const decPoint = new BN(10).pow(new BN(decimal));
  const formatted = decPoint.muln(Number(bal));
  return formatted;
};
