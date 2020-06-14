import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import { Card } from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rnNum = Math.floor(Math.random() * (max - min)) + min;
  if (rnNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rnNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setcurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Dont't lie", "You know this is wroung", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setcurrentGuess(nextNumber);
    setRounds((curRounds) => curRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")} />
        <Button
          title="GREATER"
          onPress={nextGuessHandler.bind(this, "greater")}
        />
      </Card>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});
