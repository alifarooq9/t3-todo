import { useSession, signIn, signOut } from "next-auth/react";
import { FC, useState } from "react";

const Navbar: FC = () => {
	const { data: session, status } = useSession();
	const [menu, setMenu] = useState(false);

	return (
		<nav className="fixed px-8 w-screen h-16 flex justify-center items-center mx-auto border-b bg-black z-50 border-white border-opacity-30">
			<div className="max-w-screen-md w-full flex justify-between items-center">
				<h1 className="font-bold text-2xl cursor-pointer">T3 Todo</h1>
				{status !== "loading" && (
					<div>
						{status === "authenticated" ? (
							<div className="relative">
								<button
									onClick={() => {
										menu ? setMenu(false) : setMenu(true);
									}}
									className="font-base border hover:bg-pink-500 hover:bg-opacity-20 duration-300 border-pink-500 border-opacity-40 px-7 py-1.5 rounded-xl"
								>
									{session?.user?.name}
								</button>

								{menu && (
									<div className="absolute right-0 top-12 bg-black border border-white border-opacity-30 px-10 py-4 rounded-2xl">
										<button
											onClick={() =>
												signOut({ redirect: false })
											}
											className="text-red-500"
										>
											Logout
										</button>
									</div>
								)}
							</div>
						) : (
							<button
								onClick={() => signIn("google")}
								className="text-pink-500 font-semibold"
							>
								Google Login
							</button>
						)}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
