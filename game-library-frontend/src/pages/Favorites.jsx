import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { updateFavoriteStatus, getFavoriteGames } from "../api/gameService";
const Favorites = ({ favorites, setFavorites, onFavoriteRemoved, onRate }) => {
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    getFavoriteGames().then((data) => setFavorites(data));
  };

  const removeFromFavorites = (id) => {
    updateFavoriteStatus(id, false)
      .then(() => {
        // Azonnal frissítjük a state-et, nem várunk a backendre
        setFavorites((prev) => prev.filter((game) => game.id !== id));
        onFavoriteRemoved?.(id);
      })
      .catch((error) =>
        console.error("Failed to remove from favorites:", error)
      );
  };

  return (
    <div className="w-full min-h-screen bg-custom-dark-gradient full-container max-lg:lg-container max-sm:pl-0 py-2">
      <motion.div
        className="text-left py-2 layout__item--80-percent max-lg:layout__item--70-percent border-t-1 border-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="heading">Game Library Management</h1>
        <span className="meta-info">Recently added to the library</span>
      </motion.div>
      <div className="layout__item--80-percent max-lg:layout__item--90-percent flex flex-col gap-5 padding-y">
        {favorites.map((game) => (
          <GameCard
            key={game.id}
            {...game}
            onRate={onRate}
            floatingButtons={true}
            showStars={true}
            horizontal
            actionButtons={[
              {
                icon: <Trash2 className="w-5 h-5" />,
                title: "Remove from Favorites",
                onClick: () => removeFromFavorites(game.id),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
