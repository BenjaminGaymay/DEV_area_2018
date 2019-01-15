import mysql from 'mysql';
import sha1 from 'sha1';

export const bdd = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sm21ChaiseDeMerde",
    database: "area"
});


bdd.query("INSERT INTO user (username, password) values ('admin', sha1('azertyqwerty'))", function (err) {
    if (err) console.log("Admin already exist");
});

bdd.query("SELECT * FROM user WHERE username like 'azertyqwerty'", function (err, result) {
    if (err) console.log(err);
    if (typeof result[0] != "undefined" && result[0].password === sha1("azertyqwerty"))
        console.log("Logged");
    else
        console.log("User not found or password not match.");
});

bdd.query("SELECT * FROM user", function (err, result) {
    if (err) throw err;
    console.log("Result:");
    console.log(result);
});
