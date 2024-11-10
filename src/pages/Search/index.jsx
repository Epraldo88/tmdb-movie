import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMoviesByTitle } from "../../utils/fetch";
import Error from "../../components/Error/Error";
import Pagination from "../../components/Pagination/Pagination";
import MovieContent from "../../components/MovieContent/MovieContent";

const Search = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const query = new URLSearchParams(location.search).get("query");
	const page = new URLSearchParams(location.search).get("page");
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(1);

	const onGetData = async () => {
		const result = await searchMoviesByTitle(query, page);
		if (result.error) {
			setError(result.error);
			setMovies([]);
		} else {
			setMovies(result.results);
			setTotalPages(result.total_pages);
		}
		setLoading(false);
	};

	const onChangePage = (page) => {
		navigate(`/search?query=${query}&page=${page}`);
	};

	useEffect(() => {
		if (query) {
			onGetData();
		}
	}, [query, page]);

	if (error) {
		return <Error error={error} />;
	}

	return (
		<div className="py-24">
			<Container>
				<p>Search Movie</p>
				<MovieContent isLoading={loading} movies={movies} />
				<Pagination
					currentPage={page}
					onPageChange={onChangePage}
					totalPages={totalPages}
				/>
			</Container>
		</div>
	);
};

export default Search;
