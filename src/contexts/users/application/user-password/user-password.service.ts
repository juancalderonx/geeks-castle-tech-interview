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
