export interface Values {
  issuingParty?: string;
  secretKey: string;
  userName?: string;
  cycle: number,
  digit: Digit,
  algorithm: Algorithm,
}

export enum Digit {
  Six = 6,
  Night = 8,
}

export enum Algorithm {
  Sha1 = 'SHA-1',
  Sha256 = 'SHA-256',
  Sha512 = 'SHA-512',
}
