import { useEffect, useState } from "react";

export default function useFetch(api, config) {
  const [resData, setResData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("config", config);
      setResData(null);
      setError(null);
      setLoading(true);
      try {
        const result = await api.request(config);
        console.log("result", result);
        setResData(result.data);
      } catch (e) {
        console.log("error", e.response.data);
        setError(Object.values(e.response.data).flat());
      } finally {
        setLoading(false);
      }
    };

    if (config) fetchData();
  }, [api, config]);

  return { resData, loading, error };
}
