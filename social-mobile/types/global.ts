export type PostType = {
	id: number;
	content: string;
	user: UserType;
	createdAt: string;
	comments: CommentType[];
	likes: { userId: number; postId: number }[];
};

export type UserType = {
	id: number;
	name: string;
	username: string;
	bio: string;
};

export type CommentType = {
	id: number;
	content: string;
	user: UserType;
};
