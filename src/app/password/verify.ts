const bcrypt = require('bcryptjs');

export async function verify(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}