import { useQuery } from "@tanstack/react-query";
import { testConnection } from "./services/api";
import "./App.css";

function App() {
  const {
    data: message,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["backend-test"],
    queryFn: testConnection,
  });

  if (isPending) {
    return <p>Ansluter till backend...</p>;
  }

  if (isError) {
    return <p>Fel vid anslutning: {error.message}</p>;
  }

  return (
    <main>
      <h1>Test av backendkoppling</h1>
      <p>{message}</p>
    </main>
  );
}

export default App;