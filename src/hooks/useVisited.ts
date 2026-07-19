import { useEffect, useState } from "react";

export function useVisited() {
  const [visited, setVisited] = useState<number[]>(() => {
    const saved = localStorage.getItem("visited");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "visited",
      JSON.stringify(visited)
    );
  }, [visited]);

  function toggleVisited(stamp: number) {
    setVisited((current) =>
      current.includes(stamp)
        ? current.filter((x) => x !== stamp)
        : [...current, stamp]
    );
  }

  return {
    visited,
    toggleVisited,
  };
}