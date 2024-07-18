import * as bcrypt from 'bcrypt';

export class PasswordService {
  private static readonly passwordPattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?!.*[\n])(?!.*\s)(?=.*[\d\W]).{8,12}$/;

  /**
   * Hashes a password
   * @param password Password to hash
   * @returns Hashed password
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Generates a secure password in case the user does not provide one
   * @returns Secure password
   */
  static generateSecurePassword(): string {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

    let password = '';

    for (let i = 0, n = charset.length; i < 12; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    return password;
  }

  /**
   * Validates and hashes a password
   * @param password Password to validate and hash
   * @returns Hashed password
   */
  static async validateAndHashPassword(password: string): Promise<string> {
    if (!this.passwordPattern.test(password)) {
      throw new Error(
        'The password must be 8 to 25 characters long and contain at least one uppercase letter, one lowercase letter and one special character or number. No line breaks or blank spaces are allowed.',
      );
    }

    return await this.hashPassword(password);
  }
}
