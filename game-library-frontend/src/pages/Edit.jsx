import { createGame, updateGame, deleteGame } from "../api/gameService";
import { useState } from "react";
import Search from "../components/Search";
import GameCard from "../components/GameCard";
import Form from "../components/Form";
import { Trash2, Edit2, SearchX, AlertTriangle, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../components/Button";
const Edit = ({
  games,
  setGames,
  query,
  setQuery,
  loading,
  error,
  selectedGame,
  setSelectedGame,
  fetchGames,
}) => {
  const [showForm, setShowForm] = useState(false);
  const handleDelete = async (id) => {
    try {
      await deleteGame(id);
      // Opcionálisan szűrd a listát, ha itt állapotban van:
      const updatedGames = games.filter((game) => game.id !== id);
      setGames(updatedGames); // Ha itt kezeled az állapotot!
    } catch (error) {
      console.error("Hiba történt törlés közben:", error);
    }
  };

  return (
    <div className="w-full relative min-h-screen padding-y bg-custom-dark-gradient full-container max-lg:lg-container max-sm:pl-0">
      <div className="fixed bottom-[20px] right-[5px] p-2 z-40">
        <Button
          title="Add Game"
          icon={<Plus className="w-10 h-10" />}
          floating={false}
          onClick={() => {
            setShowForm(true);
            console.log("müködik");
          }}
        />
      </div>

      <Form
        showForm={showForm}
        setShowForm={setShowForm}
        onClose={() => {
          setShowForm(false);
          setSelectedGame(null);
        }}
        onSubmit={(gameData) => {
          if (gameData.id) {
            updateGame(gameData).then(() => {
              fetchGames();
              setSelectedGame(null);
              setShowForm(false);
            });
          } else {
            createGame(gameData).then(() => {
              fetchGames();
              setSelectedGame(null);
              setShowForm(false);
            });
          }
        }}
        initialGame={selectedGame}
      />

      <Search query={query} setQuery={setQuery} />
      <motion.div
        className="text-left py-3 layout__item--80-percent max-lg:layout__item--70-percent border-t-1 border-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="heading">Game Library Management</h1>
        <span className="meta-info">Recently added to the library</span>
      </motion.div>
      {loading ? (
        <p className="text-center text-gray-400 mt-10">Loading games...</p>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center text-center mt-16 text-red-400"
        >
          <AlertTriangle size={48} className="mb-4 animate-pulse" />
          <p className="text-2xl font-exo py-2 font-semibold">{error}</p>
        </motion.div>
      ) : games.length > 0 ? (
        <div className="layout__item--80-percent max-lg:layout__item--70-percent  grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              {...game}
              floatingButtons={false}
              actionButtons={[
                {
                  title: "Delete",
                  icon: <Trash2 className="w-5 h-5" />,
                  onClick: () => handleDelete(game.id),
                },
                {
                  title: "Update",
                  icon: <Edit2 className="w-5 h-5" />,
                  onClick: () => {
                    setSelectedGame(game); // ⬅️ Állapotot frissítünk
                    setShowForm(true); // ⬅️ Formot megnyitjuk
                  },
                },
              ]}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center mt-16"
        >
          <SearchX size={48} className="mb-4 animate-pulse" />
          <p className="text-2xl font-exo py-2 font-semibold">No games found</p>
        </motion.div>
      )}
    </div>
  );
};

export default Edit;
