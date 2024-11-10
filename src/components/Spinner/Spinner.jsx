import React from "react";

const Spinner = () => {
	return (
		<div className="flex flex-col items-center justify-center h-full gap-6">
			<div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin" />
			<p>Fetching movie, please wait ...</p>
		</div>
	);
};

export default Spinner;
