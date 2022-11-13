import SimpleCrypto from "simple-crypto-js";
const simpleCrypto = new SimpleCrypto('');

export function Encrypt(secret: string, data: object): (string | 'error'){
  try {
    simpleCrypto.setSecret(secret);
    return simpleCrypto.encrypt(data);
  } catch (error) {
    return 'error';
  }
};

export function Decrypt(secret: string,data: string):(object | 'error'){
  try {
    simpleCrypto.setSecret(secret);
    return simpleCrypto.decrypt(data) as object;
  } catch (error) {
    return 'error';
  }
}