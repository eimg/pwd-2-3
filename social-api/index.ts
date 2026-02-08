import expres from "express";
const app = expres();

import { router as usersRouter } from "./routes/users";
app.use("/users", usersRouter);

import { router as postsRouter } from "./routes/posts";
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
    res.json({ msg: "API up and running..." });
});

app.listen(8800, () => {
    console.log("API Running at 8800...");
});
