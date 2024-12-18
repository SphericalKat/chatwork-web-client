import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";

export const getRandomString = (length = 10) => {
  if (length % 2 === 1) {
    throw new Error("Only even sizes are supported");
  }

  const buf = new Uint8Array(length / 2);
  crypto.getRandomValues(buf);
  let ret = "";
  for (let i = 0; i < buf.length; ++i) {
    ret += `0${buf[i].toString(16)}`.slice(-2);
  }
  return ret;
};

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}
