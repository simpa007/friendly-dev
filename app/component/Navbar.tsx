import React, { useState } from "react";

import { NavLink } from "react-router";
import { FaLaptopCode } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	const base = "transition hover:text-blue-400";
	const active = "text-blue-400 font-semibold";
	return (
		<nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
			<div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
				<NavLink
					to="/"
					className="flex items-center gap-2 text-lg font-bold text-blue-300"
				>
					<FaLaptopCode className="text-blue-400 text-xl" />
					<span>The Friendly Developer</span>
				</NavLink>

				{/* Desktop */}
				<div className="hidden md:flex items-center gap-6">
					<div className="space-x-4 text-sm text-gray 300">
						<NavLink
							className={({ isActive }) => (isActive ? active : base)}
							to="/"
						>
							Home
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? active : base)}
							to="/projects"
						>
							Projects
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? active : base)}
							to="/about"
						>
							About
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? active : base)}
							to="/blog"
						>
							Blog
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? active : base)}
							to="/contact"
						>
							Contact
						</NavLink>
					</div>
				</div>
				<div className="md:hidden flex items-center gap-4">
					<button
						className="cursor-pointer text-blue-400 text-xl"
						title="menu"
						onClick={() => setMenuOpen(!menuOpen)}
					>
						{menuOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>
			</div>

			{/* Mobile View */}
			{menuOpen && (
				<div className="md:hidden flex flex-col bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-4 text-center">
					<NavLink
						className={({ isActive }) => (isActive ? active : base)}
						onClick={() => setMenuOpen(false)}
						to="/"
					>
						Home
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? active : base)}
						onClick={() => setMenuOpen(false)}
						to="/projects"
					>
						Projects
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? active : base)}
						onClick={() => setMenuOpen(false)}
						to="/about"
					>
						About
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? active : base)}
						onClick={() => setMenuOpen(false)}
						to="/blog"
					>
						Blog
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? active : base)}
						onClick={() => setMenuOpen(false)}
						to="/contact"
					>
						Contact
					</NavLink>
				</div>
			)}
		</nav>
	);
}
