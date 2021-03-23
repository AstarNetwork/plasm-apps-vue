import BN from 'bn.js';

// type of account should be string
export type Address = string;
export type Balance = BN;
export type BalanceFull = {
  free: Balance;
  reserved: Balance;
  miscFrozen: Balance;
  feeFrozen: Balance;
};
export type AccountInfo = {
  nonce: number;
  refcount: number;
  data: BalanceFull;
};
