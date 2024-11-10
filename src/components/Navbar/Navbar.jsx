import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const navItem = [
		{
			label: "Home",
			url: "/",
		},
	];

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			// Redirect to /search with the query string
			navigate(`/search?query=${searchQuery}&page=1`);
		}
		setSearchQuery("");
	};

	return (
		<nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-[1px] p-4 text-white shadow-md z-10">
			<div className="container mx-auto flex items-center justify-between">
				{/* Logo */}
				<div className="text-2xl font-bold">
					<NavLink to="/" className="text-white">
						MyApp
					</NavLink>
				</div>

				{/* Search Bar */}
				<form onSubmit={handleSearchSubmit} className="relative">
					<input
						type="text"
						value={searchQuery}
						onChange={handleSearchChange}
						placeholder="Search movie title..."
						className="px-3 py-2 rounded text-gray-800 border border-gray-800 w-96"
					/>
					<button
						type="submit"
						className="absolute right-2 top-2 px-2 py-1 text-sm text-white bg-blue-500 rounded"
					>
						Search
					</button>
				</form>

				{/* Navigation Links */}
				<div className="flex space-x-4">
					{navItem.map((res, index) => (
						<NavLink
							key={index}
							to={`/${res.url !== "/" ? res.url.toLowerCase() : ""}`}
							className={({ isActive }) =>
								`relative px-3 py-2 rounded ${
									isActive ? "text-blue-400" : "text-white"
								} group`
							}
						>
							{res.label}
							<span
								className={`absolute left-0 -bottom-1 h-0.5 w-full bg-blue-400 transition-transform duration-300 ${
									location.pathname === res.url
										? ""
										: "scale-x-0 group-hover:scale-x-100"
								}`}
							></span>
						</NavLink>
					))}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
