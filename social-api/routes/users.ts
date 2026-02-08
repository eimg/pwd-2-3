import express from "express";

import { prisma } from "../libs/prisma";

export const router = express.Router();

router.post("/", async (req, res) => {
    const name = req.body?.name;
    const username = req.body?.username;
    const bio = req.body?.bio;
    const password = req.body?.password;

    if(!name || !username || !password) {
        return res.status(400).json({ msg: "name, username or password missing" });
    }

    const user = await prisma.user.create({
        data: { name, username, bio, password }
    });

    res.json(user);
});
