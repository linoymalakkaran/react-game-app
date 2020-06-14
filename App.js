import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Header } from "./components/Header";
import { StartGameScreen } from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (noOfRounds) => {
    setGuessRounds(noOfRounds);
  };

  const restartGame = () => {
    setUserNumber(0);
    setGuessRounds(0);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        onRestartGame={restartGame}
        userNumber={userNumber}
        numberOfRounds={guessRounds}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number"></Header>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
