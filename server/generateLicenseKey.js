
// Node.js script to generate a signed license key for a customer
// Usage:
//   node generateLicenseKey.mjs <CUSTOMER_KEY>
// or, if you want to keep .js extension, add { "type": "module" } to your server/package.json

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Path to your private key (PEM format)
const PRIVATE_KEY_PATH = path.resolve('./private_key.pem');

function signLicenseKey(customerKey) {
  const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
  const sign = crypto.createSign('SHA256');
  sign.update(customerKey);
  sign.end();
  const signature = sign.sign(privateKey, 'base64');
  return `${customerKey}.${signature}`;
}

const customerKey = process.argv[2] || 'AI-CHATBOT-UIKIT-2025-001';
const licenseKey = signLicenseKey(customerKey);

console.log('Customer Key:', customerKey);
console.log('License Key:', licenseKey);

console.log('\n---');
console.log('To generate a private/public key pair, run:');
console.log('  openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048');
console.log('  openssl rsa -pubout -in private_key.pem -out public_key.pem');
console.log('Distribute public_key.pem to your UI kit as VITE_PUBLIC_KEY.');
