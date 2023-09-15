import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";

export default function Dashboard() {
  const token = useSelector((state) => state.user.accessToken);
  const [posts, setPosts] = useState([]);

  const [config, setConfig] = useState(null);
  const { resData } = useFetch(config);

  useEffect(() => {
    setConfig({
      method: "get",
      url: "/social/posts/",
      headers: { Authorization: `Bearer ${token}` },
    });
  }, [token]);

  useEffect(() => {
    if (resData) setPosts(resData.results);
  }, [resData]);

  if (!posts) return <h2>Loading posts...</h2>;

  return (
    <div id="posts">
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}
