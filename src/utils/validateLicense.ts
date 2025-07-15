
// Utility to validate license key using RSA public key
// licenseKey: "customerKey.base64signature"
// publicKey: PEM string

function pemToArrayBuffer(pem: string): ArrayBuffer {
  // Remove header, footer, and line breaks
  const b64 = pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function validateLicenseKey(licenseKey: string, publicKey?: string): Promise<boolean> {
  if (!licenseKey || !publicKey) return false;
  const [key, signatureB64] = licenseKey.split('.');
  if (!key || !signatureB64) return false;

  try {
    // Import the PEM public key
    const keyBuffer = pemToArrayBuffer(publicKey);
    const cryptoKey = await window.crypto.subtle.importKey(
      'spki',
      keyBuffer,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['verify']
    );

    // Verify the signature
    const encoder = new TextEncoder();
    const data = encoder.encode(key);
    const signature = Uint8Array.from(atob(signatureB64), c => c.charCodeAt(0));
    const valid = await window.crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      signature,
      data
    );
    return valid;
  } catch (e) {
    return false;
  }
}
