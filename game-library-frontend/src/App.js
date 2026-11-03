import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Menu } from "lucide-react";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Edit from "./pages/Edit";
import Favorites from "./pages/Favorites";
import { getFavoriteGames } from "./api/gameService";
import { updateRating } from "./api/gameService";
import { getUserRole } from "./utils/auth";

function App() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchGames = (q = "") => {
    setLoading(true);

    const query = (q || "").toString().trim();

    const url = query
      ? `/games/search?q=${encodeURIComponent(query)}`
      : `/games`;

    fetch(url, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hálózati válasz nem megfelelő");
        }
        return response.json();
      })
      .then((data) => {
        setGames(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load data. Please check your internet connection!");
        setLoading(false);
      });
  };

  const handleLogout = () => {
  setGames([]);
  setFavorites([]);
  setSelectedGame(null);
  setQuery("");
  setError(null);
  setLoading(false);
};

  const handleRate = (id, value) => {
    updateRating(id, value).then((updatedGame) => {
      // Frissítjük az összes játék listáját
      console.log("katt!!")
      setGames((prevGames) =>
        prevGames.map((g) => (g.id === id ? { ...g, rating: value } : g))
      );

      // Frissítjük a kedvencek listáját is
      setFavorites((prevFavorites) =>
        prevFavorites.map((g) => (g.id === id ? { ...g, rating: value } : g))
      );
    });
  };

  const handleGameUpdated = (updatedGame) => {
    setGames((prevGames) =>
      prevGames.map((g) => (g.id === updatedGame.id ? updatedGame : g))
    );

    setFavorites((prevFavorites) => {
      if (updatedGame.favorite) {
        return [
          ...prevFavorites.filter((g) => g.id !== updatedGame.id),
          updatedGame,
        ];
      } else {
        return prevFavorites.filter((g) => g.id !== updatedGame.id);
      }
    });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchGames(query);
    }, 300); // debounce 300ms

    return () => clearTimeout(timeout); // törlés ha gyorsan gépel valaki
  }, [query]);

  useEffect(() => {
    getFavoriteGames()
      .then((data) => setFavorites(data))
      .catch((err) => console.error(err));
  }, []);

  const handleFavoriteRemoved = (id) => {
    setGames((prev) =>
      prev.map((game) => (game.id === id ? { ...game, favorite: false } : game))
    );
  };

  return (
    <div className="App">
      <div
        className="sm:hidden fixed top-4 left-4 cursor-pointer z-50"
        onClick={() => {
          console.log("Kattintottam a menüre");
          setIsSidebarOpen(true);
        }}
      >
        <Menu className="h-8 w-8" />
      </div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Routes>
        <Route
  path="/"
  element={<Home onLoginSuccess={fetchGames} onLogout={handleLogout} />}
/>
<Route
  path="/games"
  element={
    localStorage.getItem("token") ? (
      <Games
        games={games}
        query={query}
        setQuery={setQuery}
        loading={loading}
        error={error}
        onGameUpdated={handleGameUpdated}
        onRate={handleRate}
      />
    ) : (
      <Navigate to="/" replace />
    )
  }
/>
        <Route
  path="/edit"
  element={
    getUserRole() === "ADMIN" ? (
      <Edit
        games={games}
        setGames={setGames}
        query={query}
        setQuery={setQuery}
        loading={loading}
        error={error}
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        fetchGames={fetchGames}
      />
    ) : (
      <Navigate to="/" replace />
    )
  }
/>
<Route
  path="/favorites"
  element={
    localStorage.getItem("token") ? (
      <Favorites
        onFavoriteRemoved={handleFavoriteRemoved}
        onRate={handleRate}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    ) : (
      <Navigate to="/" replace />
    )
  }
/>
      </Routes>
    </div>
  );
}

export default App;
