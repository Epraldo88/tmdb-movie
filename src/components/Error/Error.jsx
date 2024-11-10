import React from "react";
import Container from "../Container/Container";

const Error = ({ error }) => {
	return (
		<div className="py-24">
			<Container>
				<div className="text-red-500">{error}</div>
			</Container>
		</div>
	);
};

export default Error;
