import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Text>User number: {props.userNumber}</Text>
      <Text>Number of rounds: {props.numberOfRounds}</Text>
      <Button title="New Game" onPress={props.onRestartGame} />
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
