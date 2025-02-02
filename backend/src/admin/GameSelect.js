// src/admin/GameSelect.js
import React, { useState, useEffect } from "react";
import { Select } from "@adminjs/design-system";

const GameSelect = (props) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetch("/api/games")
      .then((response) => response.json())
      .then((data) => {
        const gameOptions = data.map((game) => ({
          value: game.id.toString(),
          label: `${game.name} - ${game.category}`,
        }));
        setGames(gameOptions);
      })
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  useEffect(() => {
    if (props.value) {
      const game = games.find(g => g.value === props.value.toString());
      setSelectedGame(game || null);
    }
  }, [props.value, games]);

  const handleChange = (selectedOption) => {
	setSelectedGame(selectedOption);
	if (props.onChange) {
	  const value = selectedOption ? selectedOption.value : null;
	  props.onChange(value);
	}
  };

  // In GameSelect component
console.log('Selected game:', selectedGame);

// In 'before' hooks
console.log('Request payload:', request.payload);

  return React.createElement(Select, {
    ...props,
    options: games,
    onChange: handleChange,
    value: selectedGame,
    isClearable: true,
    placeholder: "Select a game..."
  });
};

export default GameSelect;