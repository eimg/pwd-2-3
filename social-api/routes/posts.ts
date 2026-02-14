import express from "express";
import { prisma } from "../libs/prisma";

import { auth } from "../middlewares/auth";

export const router = express.Router();

router.get("/", async (req, res) => {
	const posts = await prisma.post.findMany({
		orderBy: { id: "desc" },
		include: { user: true, comments: true },
		take: 20,
	});

	res.json(posts);
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const post = await prisma.post.findFirst({
		where: { id: Number(id) },
		include: {
			user: true,
			comments: {
				include: { user: true },
			},
		},
	});

	res.json(post);
});

router.post("/", auth, async (req, res) => {
	const content = req.body?.content;
	if (!content) {
		return res.status(400).json({ msg: "content is required" });
	}

	const post = await prisma.post.create({
		data: {
			content,
			userId: res.locals.user.id as number,
		},
	});

	res.status(201).json(post);
});
