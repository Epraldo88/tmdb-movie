import React from "react";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const MovieContent = ({ isLoading, movies }) => {
	const navigate = useNavigate();

	const onGoToDetail = (id) => {
		navigate(`/detail?id=${id}`);
	};

	return (
		<div>
			{!isLoading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
					{movies.map((movie) => (
						<div
							key={movie.id}
							className="bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer"
						>
							<div
								className="relative group overflow-hidden"
								onClick={() => onGoToDetail(movie.id)}
							>
								<img
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
									className="w-full h-auto object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
								/>
							</div>
							<div className="p-4">
								<h3 className="text-lg font-semibold text-white">
									{movie.title}
								</h3>
								<p className="text-sm text-gray-400">
									{new Date(movie.release_date).getFullYear()}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default MovieContent;
