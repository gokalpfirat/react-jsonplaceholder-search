export default async function ({ queryKey }) {
  const id = queryKey[1];

  if (!id) throw new Error("No id given");

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
  );

  if (!res.ok) {
    throw new Error(`posts/${id}/comments fetch not ok`);
  }

  return res.json();
}
