import bcrypt from "bcryptjs";

let password = "apple";
let hash = bcrypt.hashSync(password, 10);

console.log(hash);

if(bcrypt.compareSync("apple", hash)) {
    console.log("Correct password");
} else {
    console.log("Incorrect password!");
}
