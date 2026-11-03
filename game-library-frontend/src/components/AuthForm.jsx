import { useState } from "react";

const AuthForm = ({title, register, onToggleMode, onSubmit}) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();

  if (register && password !== confirmPassword) {
    alert("A két jelszó nem egyezik!");
    return;
  }

  const userData = register
    ? { username, email, password }
    : { username, password };

  onSubmit(userData);
};

  return (
          <form
            className="relative bg-dark-sidebar text-white rounded-xl p-6 w-full max-w-md border border-dark-hover shadow-xl shadow-black/30"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-exo font-bold mb-4">{title}</h2>
            <div className="mb-3">
              <label className="label">Felhasználónév</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="input-field"
                required
              />
            </div>
           {register && (
            <div className="mb-3">
              <label className="label">E-mail cím</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="input-field"
                required
              />
            </div>
           )}

            <div className="mb-3">
              <label className="label">Jelszó</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {register && (
            <div className="mb-3">
              <label className="label">Jelszó megerősítése</label>
              <input
                type="password"
                required
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
           )}

            <button
              type="submit"
              disabled={register && password !== confirmPassword}
              className="w-full py-2 rounded bg-yellow-600 hover:bg-yellow-700 transition"
            >
                {title}

            </button>

                <div
                    onClick={onToggleMode}
                    className="cursor-pointer my-4 hover:text-blue-500"
                >
                      {register
                        ? "Már van fiókod? Bejelentkezés"
                        : "Regisztráció"
                       }
                </div>

                {register &&
                    confirmPassword !== "" &&
                    password !== confirmPassword && (
                        <p className="text-red-500">
                        A két jelszó nem egyezik!
                        </p>
                )}

          </form>

  )
}

export default AuthForm