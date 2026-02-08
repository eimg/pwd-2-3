import express from "express";
import { prisma } from "../libs/prisma";

export const router = express.Router();

router.get("/", async (req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: { id: "desc" },
        take: 20,
    });

    res.json(posts);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const post = await prisma.post.findFirst({
        where: { id: Number(id) }
    });

    res.json(post);
});

router.post("/", async (req, res) => {
    const content = req.body?.content;
    if(!content) {
        return res.status(400).json({msg: "content is required"});
    }

    const post = await prisma.post.create({
        data: {
            content,
            userId: 1,
        }
    });

    res.status(201).json(post);
});