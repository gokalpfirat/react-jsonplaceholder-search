import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary component caught error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <article>
          <header>There was an error with this post</header>
          <Link to="/">Click here to got back to the home page</Link>
        </article>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
