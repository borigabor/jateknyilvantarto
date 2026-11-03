import { motion } from "framer-motion";
import Button from "../components/Button";
import { Star } from "lucide-react";
import defaultImage from "../assets/no-cover.png";
import StarRating from "./StarRating";

const GameCard = ({
  id,
  title,
  coverImageUrl,
  studio,
  genres = [],
  floatingButtons,
  actionButtons = [],
  showStars,
  horizontal = false,
  rating,
  onRate,
}) => {
  return (
    <motion.div
      className={`opacity-0 items-center relative rounded-lg bg-dark-sidebar shadow-game-card hover:shadow-game-hover transition-smooth group border-1 border-base ${
        horizontal ? "flex flex-row items-start gap-4 p-3" : "flex flex-col"
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`overflow-hidden ${
          horizontal
            ? "flex-none w-40 h-40 rounded-l-lg"
            : "w-full rounded-t-lg"
        }`}
      >
        <img
          src={coverImageUrl ? coverImageUrl : defaultImage}
          alt="game cover"
          className={`object-cover group-hover:scale-110 duration-500 ${
            horizontal ? "w-full h-full" : "w-full h-48"
          }`}
        />
      </div>

      <div
        className={`${
          !floatingButtons
            ? "relative top-[-20px] -mb-[20px] py-1 gap-3 flex justify-center w-full"
            : ""
        }`}
      >
        {actionButtons.map((btn, index) => (
          <Button
            key={index}
            title={btn.title}
            icon={btn.icon}
            onClick={btn.onClick}
            floating={floatingButtons}
            className={btn.className}
          />
        ))}
      </div>

      <div
        className={`flex flex-col gap-y-2 ${
          horizontal
            ? "flex-1 items-start text-left max-w-[calc(100%-12rem)]"
            : "items-center text-center p-3"
        }`}
      >
        <h3 className="font-exo text-lg">{title}</h3>
        <p className="text-dark-muted text-sm pb-2">{studio}</p>

        <div
          className={`flex flex-wrap gap-2 w-full mb-2 ${
            horizontal ? "" : "justify-center"
          }`}
        >
          {genres.map((item) => (
            <span
              className="text-dark-muted text-xs bg-dark-surface p-1 rounded-lg"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>

        {showStars && (
          <StarRating rating={rating} onRate={(value) => onRate(id, value)} />
        )}
      </div>
    </motion.div>
  );
};

export default GameCard;
