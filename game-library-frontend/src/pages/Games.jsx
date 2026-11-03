import GameCard from "../components/GameCard";
import Search from "../components/Search";
import { motion } from "framer-motion";
import { SearchX, AlertTriangle, Heart } from "lucide-react";
import { updateFavoriteStatus } from "../api/gameService";

const Games = ({
  games,
  query,
  setQuery,
  loading,
  error,
  onGameUpdated,
  onRate,
}) => {
  const handleFavoriteClick = (games) => {
    updateFavoriteStatus(games.id, !games.favorite)
      .then((updatedGame) => onGameUpdated(updatedGame))
      .catch((err) => console.error(err));
    console.log("Kattintva a szívre:", games);
  };

  return (
    <div className="w-full min-h-screen padding-y bg-custom-dark-gradient full-container max-lg:lg-container max-sm:pl-0">
      <Search query={query} setQuery={setQuery} />

      <motion.div
        className="text-left mb-5 layout__item--80-percent max-lg:layout__item--70-percent border-t-1 border-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="heading">New games just dropped</h1>
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
        <div className="layout__item--80-percent max-lg:layout__item--70-percent  grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              {...game}
              onRate={onRate}
              floatingButtons={true}
              showStars={true}
              actionButtons={[
                {
                  icon: <Heart className="w-5 h-5" />,
                  title: game.favorite
                    ? "Remove from Favorites"
                    : "Add to Favorites",
                  onClick: () => handleFavoriteClick(game),
                  className: game.favorite ? "bg-yellow-500" : "",
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

export default Games;
