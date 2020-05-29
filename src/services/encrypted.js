import { JSEncrypt } from 'jsencrypt'

let publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkujc+Bdo3a54GSYn6dIrRomeKwR9xfLU5faEq1Rsxcy7TbInkcOtKaX9IVBve3INf6FFholtKLJZojRroADCYDd85xYSctncuCplEQoJPsfCsZfoZ0QF0jDphValmCqAJlq3cEF8VzxYWtlmKLZMeJAmjlny9SaHb+vtk/YM4OQCW12Fw60+SjEQD4+Ds8HO7LZYlp6bkHZivIcAPevMd7IVltVd1O2qKlVyj6Bv5hYn8wuNcHftLQx3t/aZATnUIKsqA90Iyj75AUdFMeDGTI0lstHvjbgnHPlELMEpaXLDqctWi6709psqogKJefDfx+fR87eYquqVaoQFlhBbFwIDAQAB"


export function encryptedData(data) {
  // 新建JSEncrypt对象
  let encryptor = new JSEncrypt();
  // 设置公钥
  encryptor.setPublicKey(publicKey);
  // 加密数据
  return encryptor.encrypt(data);
}