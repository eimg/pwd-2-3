import jwt from "jsonwebtoken";

let secret = "my-secret-key";
let user = { id: 1, name: "Alice" };

let token = jwt.sign(user, secret);

console.log(token);

console.log( jwt.verify(token, secret) );
