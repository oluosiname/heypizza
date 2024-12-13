import { useState, useEffect } from "react";

export const useApi = <T>(
  path: string,
  params: Record<string, string> = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(params).toString();
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${path}`;
        url = queryParams ? `${url}?${queryParams}` : url;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Network response was not ok");
        const result = await res.json();
        setData(result.data);
      } catch (err: Error | unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchData();
  }, [path, params]);

  return { data, error };
};
