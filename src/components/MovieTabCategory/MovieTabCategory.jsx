import React, { useEffect } from "react";

const MovieTabCategory = ({ onChange, active }) => {
	const tabItem = ["Now Playing", "Popular", "Top Rated", "Upcoming"];

	return (
		<div className="flex mb-4">
			{tabItem.map((res) => (
				<div
					key={res}
					onClick={() => (active === res ? {} : onChange(res))}
					className={`relative px-3 py-2 select-none rounded cursor-pointer ${
						active === res ? "text-blue-400" : "text-white"
					} group`}
				>
					<p className="text-sm">{res}</p>
					<span
						className={`absolute left-0 -bottom-1 h-0.5 w-full bg-blue-400 transition-transform duration-300 ${
							active === res ? "" : "scale-x-0 group-hover:scale-x-100"
						}`}
					></span>
				</div>
			))}
		</div>
	);
};

export default MovieTabCategory;
