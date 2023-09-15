import "./App.css";
import LoadingSpinner from "./components/LoadingSpinner";
import useReloadAuth from "./hooks/useReloadAuth";
import Router from "./routes";

function App() {
  const { loading } = useReloadAuth();

  if (loading) return <LoadingSpinner />;
  return <Router />;
}

export default App;
