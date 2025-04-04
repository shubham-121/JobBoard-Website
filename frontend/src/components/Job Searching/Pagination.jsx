//receives total Pages and post per pages. Using this generate page numbers

export default function Pagination({
  curPage,
  totalPosts,
  postPerPage,
  setCurPage,
}) {
  console.log("pagination component", totalPosts, postPerPage);
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  console.log("Pagination array", pages);

  return (
    <div className="flex justify-center items-center gap-2 flex-row   font-medium ">
      {pages.map((page, indx) => (
        <button
          key={indx}
          className={`px-3 py-1 border-2 border-gray-400 ${
            curPage === page
              ? "bg-blue-400 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setCurPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
