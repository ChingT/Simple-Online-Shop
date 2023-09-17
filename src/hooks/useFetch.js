import { useState } from "react";

export default function useFetch(api) {
  const [resData, setResData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async ({ method, url, data, headers, params }) => {
    console.log({ method, url, data, headers, params });
    try {
      setLoading(true);
      const result = await api.request({ method, url, data, headers, params });
      console.log("result", result);
      setResData(result.data);
    } catch (e) {
      console.log("error", e.response.data);
      setError(Object.values(e.response.data).flat());
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, resData, loading, error };
}
