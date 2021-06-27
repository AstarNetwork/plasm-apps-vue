// it's varient based on decimal from network metadata
export const defaultUnitIndex = 5;
const arrUnitPrefixes = [-15, -12, -9, -6, -3, 0, 3, 6, 9, 12];
const arrUnitNames = [
  'femto',
  'pico',
  'nano',
  'micro',
  'milli',
  'default',
  'Kilo',
  'Mill',
  'Bill',
  'Tril',
];

export const getUnitNames = (defaultName: string) => {
  arrUnitNames[defaultUnitIndex] = defaultName;
  return arrUnitNames;
};

export const getUnit = (unitType: string) => {
  const index = arrUnitNames.findIndex((elem) => elem === unitType);
  return arrUnitPrefixes[index];
};
