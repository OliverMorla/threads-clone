import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setThreads } from "@/redux/slices/thread-slice";

const useFetch = (url: string, config: any) => {
  const options = useMemo(() => config, [config]);

  const threadDispatch = useDispatch();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data !== null) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, options);
        const response = await res.json();

        if (response.ok) {
          setData(response.data);
          setLoading(false);
          if (url === "/api/auth/threads") {
            threadDispatch(setThreads(response.data));
          }
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;
