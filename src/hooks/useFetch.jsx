import { useState, useEffect } from "react";
import { api } from "../axios";

export default function useFetch(config) {
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
  }, [config]);

  return { resData, loading, error };
}
