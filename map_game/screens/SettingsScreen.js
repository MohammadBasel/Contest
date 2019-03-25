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
import db from "../db";

opponent = ""
gameId = ""
me = ""
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  goal = 0;
  async componentDidMount(){
    const{navigation }=this.props
    this.opponent = navigation.getParam("name")
    this.me = await AsyncStorage.getItem("name")
    const result = await db.collection("Games").add({Player1: this.name, Player2: this.me, Score1: 0, Score2: 0, State1: "Playing", State2: "Playing", total1: 0, total2: 0, goal1: 0, Goal2: 0})
    this.gameId = result.id;
  }
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
    
    return <View style={styles.container}>
    {
      console.log("Name is: ", this.opponent)
    }
    <Game
      playerName = {this.opponent}
      color = "blue"
      elements={this.generateButtons()}
      goal={this.goal}
      gameId={this.gameId}
    />
    <Game
      playerName={this.me}
      color="red"
      elements={this.generateButtons()}
      goal={this.goal}
      gameId={this.gameId}
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