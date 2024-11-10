import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDetailMovie } from "../../utils/fetch";
import Spinner from "../../components/Spinner/Spinner";
import Container from "../../components/Container/Container";
import Divider from "../../components/Divider/Divider";
import DetailLabel from "../../components/DetailMovie/DetailLabel";
import Error from "../../components/Error/Error";

const Detail = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const movieId = queryParams.get("id");
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	const handleGoBack = () => {
		navigate(-1); // Navigates to the previous page in the history stack
	};
	const onGetDetail = async () => {
		const result = await getDetailMovie(movieId);
		if (result.error) {
			setError(result.error);
		} else {
			setMovie(result);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		onGetDetail();
	}, []);

	if (error) {
		return <Error error={error} />;
	}

	return (
		<div className="h-screen">
			{!isLoading ? (
				<div>
					<div className="relative w-full">
						<div
							className="top-0 left-0 w-full bg-cover bg-center"
							style={{
								backgroundImage: movie.backdrop_path
									? `linear-gradient(to top, rgba(3, 3, 3, 1), rgba(0, 0, 0, 0.3)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
									: "none",
							}}
						>
							<Container>
								<div className="h-screen flex items-center">
									<div>
										<div className="flex gap-8">
											<div>
												<img
													src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
													alt={movie.title}
													className="w-[450px]"
												/>
											</div>
											<div>
												<h1 className="">{movie.title}</h1>
												<h3>{movie.tagline}</h3>
												<Divider />
												<h1>Detail</h1>
												<div>
													<DetailLabel
														label={"Genres"}
														value={movie.genres
															.map((res) => res.name)
															.join(", ")}
													/>
													<DetailLabel
														label={"Country"}
														value={movie.origin_country.join(", ")}
													/>
													<DetailLabel
														label={"Popularity"}
														value={movie.popularity}
													/>
													<DetailLabel
														label={"Release Date"}
														value={movie.release_date}
													/>
													<DetailLabel label={"Status"} value={movie.status} />
													<DetailLabel
														label={"Spoken Languages"}
														value={movie.spoken_languages
															.map((res) => res.name)
															.join(", ")}
													/>
													<DetailLabel
														label={"Production Companies"}
														value={movie.production_companies
															.map((res) => res.name)
															.join(", ")}
													/>
													<DetailLabel
														label={"Production Countries"}
														value={movie.production_countries
															.map((res) => res.name)
															.join(", ")}
													/>
												</div>
												<Divider />
												<h1>Storyline</h1>
												<p>{movie.overview}</p>
											</div>
										</div>
										<div className="text-center mt-8">
											<button
												onClick={handleGoBack}
												className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
											>
												Back
											</button>
										</div>
									</div>
								</div>
							</Container>
						</div>
					</div>
				</div>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default Detail;
