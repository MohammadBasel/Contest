import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import Game from "./Game";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Button,
  TouchableOpacity,
  Dimensions
  /*, StyleSheet*/
} from "react-native";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  goal = 0;
  generateButtons = () => {
    let elements = Array.from({
      length: 6
    }).map(() => Math.floor(Math.random() * 10));

    // for (let i = 0; i < parseInt(this.state.numOfFelids); i++) {
    //   elements[i] = Math.floor(Math.random() * 100);
    // }
    // console.log(this.state.numOfFelids);
    elements = this.setGoal(elements);
    return elements;
  };

  setGoal = elements => {
    // this.goal =
    //   this.elements
    //     .slice(0, firstpoint)
    //     .reduce((acc, curent) => acc + curent, 0) +
    //   this.elements
    //     .slice(4, seconpoint)
    //     .reduce((acc, curent) => acc + curent, 0);

    this.goal = elements.slice(0, 4).reduce((acc, curent) => acc + curent, 0);

    for (let i = 0; i < elements.length; i++) {
      firstpoint = Math.floor(Math.random() * 6);
      firstarr = elements.slice(0, firstpoint);
      secondarr = elements.slice(firstpoint, elements.length);
      elements = secondarr.concat(firstarr);
    }
    return elements;
  };

  render() {
    const{navigation }=this.props
    const name = navigation.getParam("name")
    return <View style={styles.container}>
    <Game
      playerName = {name}
      color = "blue"
      elements={this.generateButtons()}
      goal={this.goal}
    />
    <Game
      playerName="Mohammad"
      color="red"
      elements={this.generateButtons()}
      goal={this.goal}
    />
  </View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    //flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});