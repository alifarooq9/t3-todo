import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="font overflow-x-hidden bg-black text-white">
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
