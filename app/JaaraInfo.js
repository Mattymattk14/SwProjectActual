"use client";

import { useEffect, useState } from "react";

const JaaraInfo = () => {
  const [monster, setMonster] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/proxy?path=monsters/784")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setMonster(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!monster) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{monster.name}</h1>
      <p>Element: {monster.element}</p>
      <p>Base HP: {monster.base_hp}</p>
      <p>Base Attack: {monster.base_attack}</p>
      <p>Base Defense: {monster.base_defense}</p>
      <img src={monster.image} alt={monster.name} />
    </div>
  );
};

export default JaaraInfo;
