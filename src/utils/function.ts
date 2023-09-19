import CryptoJS from 'crypto-js';

// Function to hash a password
// export function hashPassword(password:string) {
//   // Generate a random salt (you should also store this in your database)
//   const salt = CryptoJS.lib.WordArray.random(16);

//   // Derive a key from the password and salt using PBKDF2
//   const key = CryptoJS.PBKDF2(password, salt, {
//     keySize: 512 / 32, // Key size (you can adjust this as needed)
//     iterations: 10000, // Number of iterations (you can adjust this as needed)
//     hasher: CryptoJS.algo.SHA256, // Hashing algorithm (you can use others)
//   });

//   // Combine the salt and key and convert it to a hexadecimal string
//   const hash = salt.toString() + key.toString();

//   return hash;
// }

// Function to generate a random salt
export function generateSalt(): string {
  return CryptoJS.lib.WordArray.random(16).toString();
}

// Function to hash a password
export function hashPassword(password: string, salt: string): string {
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 512 / 32,
    iterations: 10000,
    hasher: CryptoJS.algo.SHA256,
  });

  return salt + key.toString();
}

// Function to verify a password
export function verifyPassword(plaintextPassword: string, storedHashedPassword: string): boolean {
  // Extract the stored salt from the stored hashed password
  const salt = storedHashedPassword.slice(0, 32);

  // Hash the provided plaintext password with the extracted salt
  const hashedPasswordToCheck = hashPassword(plaintextPassword, salt);

  // Compare the newly generated hash with the stored hashed password
  return hashedPasswordToCheck === storedHashedPassword;
}