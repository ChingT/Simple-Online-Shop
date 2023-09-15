import "./App.css";
import useReloadAuth from "./hooks/useReloadAuth";
import Router from "./routes";

function App() {
  const { loading } = useReloadAuth();

  if (!loading) return <Router />;
  return <h2>Loading accessToken...</h2>;
}

export default App;
