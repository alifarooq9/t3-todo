import { FC, useState } from "react";
import { trpc } from "../utils/trpc";

interface todoDataType {
	title: string;
	todo: string;
}

const Todos: FC = () => {
	const [todoData, setTodoData] = useState<todoDataType>({
		title: "",
		todo: "",
	});

	const { data, status, refetch, isLoading } = trpc.useQuery(["todo.get"]);

	const todo = trpc.useMutation(["todo.add"]);
	const handelAddTodo = async (e: any) => {
		e.preventDefault();
		todo.mutate(
			{ title: todoData.title, todo: todoData.todo },
			{
				onSuccess: async () => {
					await refetch();
				},
			}
		);
	};

	return (
		<div className="py-24 w-screen min-h-screen px-8 max-w-screen-md mx-auto">
			<form
				onSubmit={handelAddTodo}
				className="flex flex-col items-end bg-black text-white"
			>
				<input
					type="text"
					placeholder="Title"
					value={todoData.title}
					onChange={(e) => {
						setTodoData({ ...todoData, title: e.target.value });
					}}
					className="bg-transparent border border-white border-opacity-30 h-12 px-5 rounded-xl w-full"
				/>
				<textarea
					placeholder="Type Something"
					value={todoData.todo}
					onChange={(e) => {
						setTodoData({ ...todoData, todo: e.target.value });
					}}
					className="bg-transparent border border-white border-opacity-30 h-36 mt-5 p-5 rounded-xl w-full"
				/>
				<button
					disabled={todo.isLoading}
					className="bg-white text-black font-semibold px-5 py-2 mt-4 rounded-lg hover:scale-90 duration-300"
				>
					{todo.isLoading || isLoading ? "Adding" : "Add Todo"}
				</button>
			</form>

			<div className="mt-10">
				<h1 className="text-xl font-semibold">Todos</h1>
				{status === "loading" ? (
					<h1>Loading...</h1>
				) : (
					<div className="grid grid-cols-3 gap-9 py-10">
						{data?.map((d) => (
							<div
								key={d.id}
								className="border border-white border-opacity-30 px-5 py-3 h-36 rounded-3xl"
							>
								<h1 className="font-semibold">{d.title}</h1>
								<p className="text-sm opacity-60 font-ligh">
									{d.todo}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Todos;
