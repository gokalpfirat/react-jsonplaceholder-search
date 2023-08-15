import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Container from "./Container";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostPage from "./PostPage";
import BreadcrumbContext from "./BreadcrumbContext";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  const breadcrumbState = useState();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <BreadcrumbContext.Provider value={breadcrumbState}>
          <main className="container">
            <article>
              <nav aria-label="breadcrumb">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  {breadcrumbState[0] && <li>{breadcrumbState[0]}</li>}
                </ul>
              </nav>
            </article>
            <Routes>
              <Route path="/" element={<Container />} />
              <Route path="/post/:id" element={<PostPage />} />
            </Routes>
          </main>
        </BreadcrumbContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
