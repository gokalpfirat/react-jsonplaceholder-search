import fetchPost from "./fetchPost";
import { useQuery } from "@tanstack/react-query";

export default function useComments(id) {
  const results = useQuery(["comments", id], fetchPost);
  return [results?.data ?? [], results.status];
}
