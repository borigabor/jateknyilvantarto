import { useState, useEffect } from "react";
import { getAllGenres } from "../api/gameService";
import { X } from "lucide-react";
import Button from "./Button";

const Form = ({ onClose, onSubmit, showForm, initialGame }) => {
  const isUpdateMode = Boolean(initialGame && initialGame.id);
  const [title, setTitle] = useState(initialGame?.title || "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialGame?.coverImageUrl || ""
  );
  const [studio, setStudio] = useState(initialGame?.studio || "");
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(
    initialGame?.genres?.map((g) => g.id) || []
  );

  useEffect(() => {
    getAllGenres()
      .then((data) => {
        setGenres(data); // ✅ Itt már tömb lesz
      })
      .catch((err) => console.error("Genre fetch error:", err));
  }, []);

  useEffect(() => {
    if (initialGame) {
      setSelectedGenres(
        initialGame.genres ? initialGame.genres.map((g) => g.id) : []
      );
    }
  }, [initialGame]);

  useEffect(() => {
    if (initialGame) {
      setSelectedGenres(
        initialGame.genres ? initialGame.genres.map((g) => g.id) : []
      );
      setTitle(initialGame.title || "");
      setCoverImageUrl(initialGame.coverImageUrl || "");
      setStudio(initialGame.studio || "");
    } else {
      // ha új játék hozzáadás, alaphelyzet
      setSelectedGenres([]);
      setTitle("");
      setCoverImageUrl("");
      setStudio("");
    }
  }, [initialGame]);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre.id)) {
        return prev.filter((id) => id !== genre.id);
      } else if (prev.length < 3) {
        return [...prev, genre.id];
      } else {
        return prev;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedGenreObjects = genres.filter((g) =>
      selectedGenres.includes(g.id)
    );
    const newGame = {
      ...(initialGame?.id && { id: initialGame.id }),
      title,
      coverImageUrl,
      studio,
      genres: selectedGenreObjects,
    };
    onSubmit(newGame);
    onClose();
    setTitle("");
    setCoverImageUrl("");
    setStudio("");
    setSelectedGenres([]);
    console.log("Submitting game:", newGame);
  };

  const handleClose = () => {
    onClose(); // showForm = false
    setTitle("");
    setCoverImageUrl("");
    setStudio("");
    setSelectedGenres([]);
  };

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
          <form
            onSubmit={handleSubmit}
            className="relative bg-dark-sidebar text-white rounded-xl p-6 w-full max-w-md border border-dark-hover shadow-xl shadow-black/30"
          >
            <Button
              title="Close"
              icon={<X className="h-5 w-5" />}
              onClick={handleClose}
              floating={true}
            />
            <h2 className="text-xl font-exo font-bold mb-4">Add New Game</h2>
            <div className="mb-3">
              <label className="label">Title</label>
              <input
                type="text"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="label">Cover Image URL</label>
              <input
                type="text"
                className="input-field"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="label">Studio</label>
              <input
                type="text"
                className="input-field"
                value={studio}
                onChange={(e) => setStudio(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="label">Genres</label>
              <div className="flex flex-wrap gap-2 py-3">
                {Array.isArray(genres) &&
                  genres.map((genre) => (
                    <button
                      type="button"
                      key={genre.id}
                      onClick={() => toggleGenre(genre)}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        selectedGenres.includes(genre.id)
                          ? "bg-yellow-600 border-yellow-500 text-white"
                          : "bg-dark-surface border-dark-hover text-muted"
                      }`}
                    >
                      {genre.name}
                    </button>
                  ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded bg-yellow-600 hover:bg-yellow-700 transition"
            >
              {isUpdateMode ? "Update Game" : "Add Game"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;
