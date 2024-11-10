import React, { useEffect, useState } from "react";
import { getMovie } from "../../utils/fetch";
import MovieTabCategory from "../../components/MovieTabCategory/MovieTabCategory";
import MovieContent from "../../components/MovieContent/MovieContent";
import Pagination from "../../components/Pagination/Pagination";
import Container from "../../components/Container/Container";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";

const Home = () => {
	const [activeCategory, setActiveCategory] = useState("Now Playing");
	const [isLoading, setIsLoading] = useState(true);
	const [moviesList, setMoviesList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [totalMovies, setTotalMovies] = useState(0);
	const [error, setError] = useState("");

	const onGetMovie = async (page, category) => {
		setIsLoading(true);
		setMoviesList([]);
		const movie = await getMovie(page, category);
		if (movie.error) {
			setError(movie.error);
		} else {
			const { total_pages, total_results, results } = movie;
			setTotalPages(total_pages);
			setTotalMovies(total_results);
			setMoviesList(results);
		}
		setIsLoading(false);
	};

	const onChangeCategory = (val) => {
		setCurrentPage(1);
		setActiveCategory(val);
		onGetMovie(1, val);
	};

	const onChangePage = (page) => {
		setCurrentPage(page);
		onGetMovie(page, activeCategory);
	};

	useEffect(() => {
		onGetMovie(currentPage, activeCategory);
	}, []);

	if (error) {
		return <Error error={error} />;
	}

	return (
		<div className="py-24">
			<Container>
				<MovieTabCategory onChange={onChangeCategory} active={activeCategory} />
				<MovieContent
					isLoading={isLoading}
					category={activeCategory}
					movies={moviesList}
				/>
				<Pagination
					currentPage={currentPage}
					onPageChange={onChangePage}
					totalPages={totalPages}
				/>
			</Container>
		</div>
	);
};

export default Home;
