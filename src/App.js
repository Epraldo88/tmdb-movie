import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar/Navbar";
import Search from "./pages/Search";

function App() {
	return (
		<Router basename="/tmdb-movie">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/detail" element={<Detail />} />
				<Route path="/search" element={<Search />} />
			</Routes>
		</Router>
	);
}

export default App;
