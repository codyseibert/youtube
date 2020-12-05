import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "http://localhost:4000";

function App() {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/posts?page=${page}`)
      .then((response) => response.json())
      .then(({ posts, pages }) => {
        setTotalPages(pages);
        setPosts(posts);
      });
  }, [page]);

  const previousPage = () => {
    setPage(Math.max(0, page - 1));
  };

  const nextPage = () => {
    setPage(Math.min(totalPages - 1, page + 1));
  };

  const pageNumbers = new Array(totalPages).fill(null).map((v, i) => i);

  const getPageDisplayNumber = (page) => page + 1;

  return (
    <div className="App">
      <h1>Page {getPageDisplayNumber(page)}</h1>

      {posts.map((post) => (
        <div className="post" key={post._id}>
          <h4>{post.title}</h4>
          <p>{post.text}</p>
        </div>
      ))}

      <button onClick={previousPage}>Previous</button>

      {pageNumbers.map((pageNumber) => (
        <button onClick={() => setPage(pageNumber)}>
          {getPageDisplayNumber(pageNumber)}
        </button>
      ))}

      <button onClick={nextPage}>Next</button>
    </div>
  );
}

export default App;
