import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
    private readonly algorithm = 'aes-256-cbc'; // Encryption algorithm
    private readonly key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Secret key (must be 32 bytes for aes-256-cbc)
    private readonly iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex'); // Initialization vector (must be 16 bytes for aes-256-cbc)

    async decrypt(encryptedText: string): Promise<string> {
        try {
            // Create decipher
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
            // Convert encrypted text to buffer
            const encryptedBuffer = Buffer.from(encryptedText, 'hex');
            // Decrypt
            let decrypted = decipher.update(encryptedBuffer);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            // Convert buffer to string
            return decrypted.toString();
        } catch (error) {
            console.error('Error decrypting text:', error);
            throw new Error('Decryption failed');
        }
    }

    // Sample encryption method (for completeness)
    async encrypt(text: string): Promise<string> {
        try {
            // Create cipher
            const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
            // Encrypt
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            // Convert buffer to hex string
            return encrypted.toString('hex');
        } catch (error) {
            console.error('Error encrypting text:', error);
            throw new Error('Encryption failed');
        }
    }
}
