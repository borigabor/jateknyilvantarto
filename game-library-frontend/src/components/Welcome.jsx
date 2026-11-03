const Welcome = ({ onLogout }) => {
  return (
    <>
      <h2>Üdvözöllek az oldalon, kedves felhasználó!</h2>

      <button onClick={onLogout}>
        Kijelentkezés
      </button>
    </>
  );
};

export default Welcome