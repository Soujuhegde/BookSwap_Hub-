const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bookswap.db');

db.serialize(() => {
    db.all("SELECT id, email, fullName, password FROM users", (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Users found:", rows.length);
        rows.forEach(row => {
            console.log(`Email: ${row.email}, Name: ${row.fullName}`);
        });
    });
});

db.close();
