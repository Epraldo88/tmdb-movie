import React from "react";

const DetailLabel = ({ label, value }) => {
	return (
		<p>
			{label} : <span>{value}</span>
		</p>
	);
};

export default DetailLabel;
