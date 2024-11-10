import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASEURL;

const getFetch = async (api, params) => {
	try {
		const response = await axios.get(
			`${baseUrl}/movie/${api}?api_key=${apiKey}`,
			params
		);
		return response;
	} catch (error) {
		// Handle any API-level errors (e.g., no internet, etc.)
		throw new Error("Network error: Could not fetch data.");
	}
};

export const getMovie = async (page, category) => {
	try {
		const flag = {
			"Now Playing": "now_playing",
			Popular: "popular",
			"Top Rated": "top_rated",
			Upcoming: "upcoming",
		};

		const result = await getFetch(flag[category], {
			params: { page: page },
		});

		if (result.status === 200) {
			return result.data;
		} else {
			throw new Error("Error fetching movies. Please try again later.");
		}
	} catch (error) {
		console.error("Error in getMovie:", error); // Log the error for debugging purposes
		return { error: error.message || "Something went wrong." }; // Return a user-friendly error message
	}
};

export const getDetailMovie = async (id) => {
	try {
		const result = await getFetch(`${id}`);
		if (result.status === 200) return result.data;
		else {
			throw new Error("Error fetching movies. Please try again later.");
		}
	} catch (error) {
		return { error: error.message || "Something wen wrong." };
	}
};

export const searchMoviesByTitle = async (query, page = 1) => {
	try {
		const result = await axios.get(
			`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=${page}`
		);
		return result.data; // Return search results
	} catch (error) {
		return { error: "An error occurred while searching for movies." };
	}
};
