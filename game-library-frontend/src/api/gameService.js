const BASE_URL = "/games";

export const getGameById = (id) =>
  fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Nem sikerült lekérni a játékot!");
    }
    return res.json();
  });

export const createGame = (game) =>
  fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(game),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Nem sikerült hozzáadni a játékot!");
    }
    return res.json();
  });

export const updateGame = (game) =>
  fetch(`${BASE_URL}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(game),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Nem sikerült módosítani a játékot!");
    }
    return res.json();
  });

export const deleteGame = (id) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Nem sikerült törölni a játékot!");
    }
    return res;
  });

export const getAllGenres = () =>
  fetch("/genre", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Nem sikerült lekérni a műfajokat!");
    return res.json();
  });

export function getFavoriteGames() {
  return fetch("/user-games/favorites", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch favorite games");
    }

    return response.json();
  }).then((data) => {
    return data.map((item) => ({
      ...item.game,
      favorite: item.favorite,
      rating: item.rating,
    }));
  });
}

export function updateFavoriteStatus(id, favorite) {
  return fetch(
    `/user-games/favorite?gameId=${id}&favorite=${favorite}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update favorite status");
    }
    return response.json().then((data) => ({
  ...data.game,
  favorite: data.favorite,
  rating: data.rating,
}));
  });
}

export function updateRating(id, rating) {
  return fetch(
    `/user-games/rating?gameId=${id}&rating=${rating}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update rating");
    }

    return response.json();
  }).then((data) => ({
    ...data.game,
    favorite: data.favorite,
    rating: data.rating,
  }));
}
