import * as crypto from 'crypto';

export function ValidateEnvironmentVariables() : void {
    if (!process.env.PORT) {
        throw new Error('Variable de entorno PORT no definida.');
    }
    if (!process.env.DB_HOST) {
        throw new Error('Variable de entorno DB_HOST no definida.');
    }
    if (!process.env.DB_PORT) {
        throw new Error('Variable de entorno DB_PORT no definida.');
    }
    if (!process.env.DB_USER) {
        throw new Error('Variable de entorno DB_USER no definida.');
    }
    if (!process.env.DB_PASSWORD) {
        throw new Error('Variable de entorno DB_PASSWORD no definida.');
    }
    if (!process.env.DB_NAME) {
        throw new Error('Variable de entorno DB_NAME no definida.');
    }
    if (!process.env.JWT_SECRET) {
        throw new Error('Variable de entorno JWT_SECRET no definida.');
    }
    if (!process.env.JWT_EXPIRATION_TIME) {
        throw new Error('Variable de entorno JWT_EXPIRATION_TIME no definida.');
    }
}

export function generateSHA256(value: string): string {
    const hash: crypto.Hash = crypto.createHash('sha256');
    hash.update(value);
    return hash.digest('hex');
}