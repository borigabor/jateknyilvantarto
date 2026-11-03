import { Star } from "lucide-react";

const StarRating = ({ rating, onRate }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => onRate(star)}
          className="w-6 h-6 cursor-pointer"
          fill={star <= rating ? "#facc15" : "none"} // sárga HEX a Tailwind text-yellow-500
          stroke="#f3f4f6" // text-gray-400 helyett, ha kell
        />
      ))}
    </div>
  );
};

export default StarRating;
