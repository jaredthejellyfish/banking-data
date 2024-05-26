import CryptoJS from 'crypto-js';

import { env } from '@/env';

function encryptToken(token: string) {
  return CryptoJS.AES.encrypt(token, env.PLAID_STORE_SECRET).toString();
}

function decryptToken(ciphertext: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, env.PLAID_STORE_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export { encryptToken, decryptToken };
