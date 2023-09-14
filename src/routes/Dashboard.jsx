import { useEffect, useState } from "react";
import { api } from "../axios";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const token = useSelector((state) => state.user.accessToken);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await api.get("/social/posts/", config);
        console.log('api.get "/social/posts/"', res);
        setPosts(res.data.results);
        console.log("posts", res.data.results);
      } catch (e) {
        console.log('api.get "/social/posts/" error', e);
      }
    };
    fetchPost();
  }, [token]);

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
