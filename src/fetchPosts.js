export default async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Couldn't fetch posts");
  }

  return res.json();
}
