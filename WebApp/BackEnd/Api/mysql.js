import mysql from 'mysql';
import sha1 from 'sha1';

const bdd = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sm21ChaiseDeMerde",
    database: "area"
});

export function register(username, password) {

    if (!(typeof username == "string" && typeof password == "string")) {
        console.log("Register fail with params");
        return false;
    }

    let result = true;
    bdd.query(`INSERT INTO user (username, password) values (${username}, sha1(${password}))`, function (err) {
        if (err) {
            console.log("Admin already exist");
            result = false;
            return false;
        }
        return true;
    });
    return result;
}

export function login(username, password) {
    if (!(typeof username == "string" && typeof password == "string")) {
        console.log("Login fail with params");
        return false;
    }

    bdd.query(`SELECT * FROM user WHERE username like '${username}'`, function (err, result) {
        if (err) console.log(err);
        if (typeof result[0] != "undefined" && result[0].password === sha1(password))
            console.log("Logged");
        else
            console.log("User not found or password not match.");
    });
}

register('admin', 'azertyqwerty');
login('admin', 'azertyqwerty');

bdd.query("SELECT * FROM user", function (err, result) {
    if (err) throw err;
    console.log("Result:");
    console.log(result);
});
