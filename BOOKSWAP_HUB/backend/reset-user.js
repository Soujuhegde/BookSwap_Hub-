const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const db = new sqlite3.Database('bookswap.db');

const email = 'testuser@example.com';
const password = 'password123';

async function resetPassword() {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email], function (err) {
            if (err) {
                console.error("Error updating password:", err.message);
            } else {
                if (this.changes > 0) {
                    console.log(`Success: Password for ${email} has been reset to '${password}'`);
                } else {
                    console.log(`User ${email} not found.`);
                    // Optionally create if not found, but we know it exists.
                }
            }
            db.close();
        });
    } catch (error) {
        console.error("Error hashing password:", error);
        db.close();
    }
}

resetPassword();
