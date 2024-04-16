import { Digit, Algorithm } from "./types";

export const defaultCreateData = () => ({
  issuingParty: "",
  secretKey: "",
  userName: "",
  cycle: 30,
  digit: Digit.Six,
  algorithm: Algorithm.Sha1,
});