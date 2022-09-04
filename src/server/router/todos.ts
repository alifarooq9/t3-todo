import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const todos = createProtectedRouter()
	.query("get", {
		async resolve({ ctx }) {
			return await ctx.prisma.todos.findMany({
				where: { userId: ctx.session.user.id },
				include: { user: true },
				orderBy: [
					{
						createdAt: "desc",
					},
				],
			});
		},
	})
	.mutation("add", {
		input: z.object({
			title: z.string(),
			todo: z.string(),
		}),
		async resolve({ input, ctx }) {
			return await ctx.prisma.todos.create({
				data: {
					title: input.title,
					todo: input.todo,
					userId: ctx.session.user.id,
				},
			});
		},
	});
