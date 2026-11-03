import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";

const Search = ({ query, setQuery }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="layout__item--50-percent mb-6 max-lg:mb-6 relative max-lg:layout__item--70-percent"
    >
      <SearchIcon
        className="w-5 h-5 absolute top-1/2 -translate-y-1/2 left-2"
        color="#666666"
        strokeWidth={3}
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search games..."
        className="w-full px-4 pl-10 py-2 rounded-3xl text-sm text-dark-muted font-exo bg-dark-sidebar outline-none "
      />
    </motion.div>
  );
};

export default Search;
