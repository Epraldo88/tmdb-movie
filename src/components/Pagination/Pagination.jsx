import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const MAX_VISIBLE_PAGES = 6;

	const generatePageNumbers = () => {
		const pages = [];

		if (totalPages <= MAX_VISIBLE_PAGES) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= MAX_VISIBLE_PAGES - 1) {
				for (let i = 1; i <= MAX_VISIBLE_PAGES - 1; i++) {
					pages.push(i);
				}
				pages.push("...");
				pages.push(totalPages);
			} else if (currentPage > totalPages - MAX_VISIBLE_PAGES + 2) {
				pages.push(1);
				pages.push("...");
				for (let i = totalPages - MAX_VISIBLE_PAGES + 2; i <= totalPages; i++) {
					pages.push(i);
				}
			} else {
				pages.push(1);
				pages.push("...");
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(i);
				}
				pages.push("...");
				pages.push(totalPages);
			}
		}

		return pages;
	};

	const pages = generatePageNumbers();

	return (
		<div className="flex items-center justify-center space-x-2 mt-4">
			{/* First Page Button */}
			<button
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
				className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
			>
				First
			</button>

			{/* Previous Page Button */}
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
			>
				Prev
			</button>

			{/* Page Numbers */}
			{pages.map((page, index) => (
				<button
					key={index}
					onClick={() => page !== "..." && onPageChange(page)}
					className={`px-3 py-1 text-sm font-semibold rounded ${
						page === currentPage
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300"
					} ${page === "..." && "cursor-default"}`}
					disabled={page === "..."}
				>
					{page}
				</button>
			))}

			{/* Next Page Button */}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
			>
				Next
			</button>

			{/* Last Page Button */}
			<button
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
				className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100"
			>
				Last
			</button>
		</div>
	);
};

export default Pagination;
