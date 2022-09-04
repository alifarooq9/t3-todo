import { FC } from "react";
import { trpc } from "../utils/trpc";

const Todos: FC = () => {
	return (
		<div className="py-24 w-screen min-h-screen px-8">
			<div className="flex justify-between items-center">
				<h1 className="font-semibold text-3xl">Todos</h1>
				<button className="border border-white border-opacity-40 px-7 py-3 rounded-2xl bg-white bg-opacity-0 hover:bg-opacity-20 duration-300">
					Add Todo
				</button>
			</div>
		</div>
	);
};

export default Todos;
