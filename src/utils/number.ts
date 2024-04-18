export function isDecimal(str: string) {
  return /^[0-9]+$/.test(str);
}

export function isHexadecimal(str: string) {
  return /^[0-9A-Fa-f]+$/.test(str);
}

export function isOctalSystem(str: string) {
  return /^[0-7]+$/.test(str);
}

export function isBinarySystem(str: string) {
  return /^[01]+$/.test(str);
}

export function toDecimal(hexStr: string) {
  return parseInt(hexStr, 10);
}

export function hexToDecimal(hexStr: string) {
  return parseInt(hexStr, 16);
}

export function octalDecimal(octalStr: string) {
  return parseInt(octalStr, 8);
}

export function binaryToDecimal(binaryStr: string) {
  return parseInt(binaryStr, 2);
}