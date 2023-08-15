import { useQuery } from "@tanstack/react-query";
import fetchPosts from "./fetchPosts";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import BreadcrumbContext from "./BreadcrumbContext";
import Modal from "./Modal";

const Container = () => {
  const [modalState, setModalState] = useState(false);
  const [, setBreadcrumbState] = useContext(BreadcrumbContext);
  useEffect(() => {
    setBreadcrumbState(null);
  }, []);
  const query = useQuery(["posts"], fetchPosts);
  const [filterText, setFilterText] = useState("");
  const posts =
    query?.data?.filter((post) => post.title.includes(filterText)) ?? [];

  if (query.isLoading) {
    return <div aria-busy="true"></div>;
  }

  return (
    <div className="grid">
      <article>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            setFilterText(formData.get("title"));
          }}
        >
          <label htmlFor="title">
            Title
            <input type="text" name="title" id="title" />
          </label>
          <button
            type="reset"
            className="contrast outline"
            onClick={() => setModalState(true)}
          >
            Reset
          </button>
          <button type="submit">Search</button>
        </form>
        {modalState ? (
          <Modal>
            <dialog open>
              <article>
                <header>
                  Reset Search
                  <a
                    href="#"
                    aria-label="close"
                    className="close"
                    onClick={() => setModalState(false)}
                  ></a>
                </header>
                Are you sure to reset your search?
                <footer>
                  <div className="grid">
                    <button onClick={() => setModalState(false)}>Yes</button>
                    <button
                      className="secondary"
                      onClick={() => setModalState(false)}
                    >
                      No
                    </button>
                  </div>
                </footer>
              </article>
            </dialog>
          </Modal>
        ) : null}
      </article>
      <div>
        {posts.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <article>
              <header>Title - {post.title}</header>
              {post.body}
              <footer>User ID - {post.userId}</footer>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Container;
