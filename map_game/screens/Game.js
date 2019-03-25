import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput
} from "react-native";
import db from "../db";

export default class Game extends React.Component {
  state = {
    total: 0,
    buttonId: [],
    numOfFelids: "0",
    playerName: "",
    round: 1,
    score: 0,
    color: this.props.color
  };
  elements = this.props.elements;
  goal = this.props.goal;
  timer = 0;
  score = 0;
  lastscore = 0;
  status = "Playing";
  async componentWillMount() {
    this.setState({ playerName: this.props.playerName });
    let result = null
    if(this.state.color === "blue"){
      result = await db.collection("Games").doc(this.props.gameId).update({goal1: this.props.goal})
    }
    else{
      result = await db.collection("Games").doc(this.props.gameId).update({Goal2: this.props.goal})
    }
    db.collection("Games").onSnapshot(querySnapshot => {
      const id = querySnapshot.id;
      const zone = { id, ...querySnapshot.data() };
      this.setState({ zone, coordsArr, user });
    });
    // this.startTimer();
  }
  
  //   startTimer = () => {
  //     timer = setInterval(
  //       () => this.setState({ time: this.state.time - 1 }),
  //       1000
  //     );
  //     this.timer = timer;
  //   };

  //   stopTimer = () => {
  //     clearInterval(this.timer);
  //   };

  generateButtons = () => {
    const elements = Array.from({
      length: 6
    }).map(() => Math.floor(Math.random() * 10));

    // for (let i = 0; i < parseInt(this.state.numOfFelids); i++) {
    //   elements[i] = Math.floor(Math.random() * 100);
    // }
    // console.log(this.state.numOfFelids);
    elements.in;
    this.elements = elements;
    this.setGoal();
  };

  setGoal = async  () => {
    // this.goal =
    //   this.elements
    //     .slice(0, firstpoint)
    //     .reduce((acc, curent) => acc + curent, 0) +
    //   this.elements
    //     .slice(4, seconpoint)
    //     .reduce((acc, curent) => acc + curent, 0);

    this.goal = this.elements
      .slice(0, 4)
      .reduce((acc, curent) => acc + curent, 0);

      if(this.state.color === "blue"){
        result = await db.collection("Games").doc(this.props.gameId).update({goal1: this.goal})
      }
      else{
        result = await db.collection("Games").doc(this.props.gameId).update({Goal2: this.goal})
      }

    for (let i = 0; i < this.elements.length; i++) {
      firstpoint = Math.floor(Math.random() * 6);
      firstarr = this.elements.slice(0, firstpoint);
      secondarr = this.elements.slice(firstpoint, this.elements.length);
      this.elements = secondarr.concat(firstarr);
    }
  };

  retry = () => {
    this.generateButtons();
    this.lastscore = this.score;
    this.setState({ total: 0, buttonId: [], round: this.state.round + 1 });
  };

  checkCondition = () => {
    if (this.state.total === this.goal) {
      //   this.stopTimer();
      if (this.lastscore === this.score) {
        this.score += 1;
      }
      return "You Have Won!";
    } else if (this.state.total > this.goal || this.state.time === 0) {
      //   this.stopTimer();

      this.status = "You Have Lost!";
      return "You Have Lost!";
    } else {
      this.status = "Playing";
      return "Playing";
    }
  };

  add = (num, id) => {
    this.setState({ total: this.state.total + num });
    let ids = [...this.state.buttonId];
    found = false;
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] === id) {
        found = true;
      }
    }
    if (!found) {
      ids.push(id);
      this.setState({ buttonId: ids });
    }
  };
  disable = id => {
    let ids = [...this.state.buttonId];
    found = false;
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] === id) {
        found = true;
      }
    }
    return found;
  };

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.state.color}]}>
        <View style={{ width: "80%" }}>
          <Text style={{ textAlign: "center", fontWeight: "bold" ,fontSize : 20, color : "white"}}>
            {this.state.playerName} ({this.props.number})
          </Text>
          <View style= {{backgroundColor: "lightblue",
              width : "100%",
              flexDirection: "row",
              justifyContent: "space-evenly"}}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              
              // borderRadius: 10
            }}
          >
            {this.goal}
          </Text>
          </View>

          {/* <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              onChangeText={numOfFelids => this.setState({ numOfFelids })}
              value={this.state.numOfFelids}
            />
            <Button title="Create" onPress={this.generateButtons} /> */}
        </View>
        {this.elements.map((x, i) => (
          <View
            key={i}
            style={{
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              margin: 0
            }}
          >
            <View style={{ padding: 20 }}>
              <TouchableOpacity
                key={i}
                style={
                  this.disable(i) ||
                  this.checkCondition() === "You Have Lost!" ||
                  this.state.time === 0
                    ? styles.disable
                    : styles.enable
                }
                onPress={() => this.add(x, i)}
                disabled={
                  this.disable(i) ||
                  this.checkCondition() === "You Have Lost!" ||
                  this.checkCondition() === "You Have Won!" ||
                  this.state.time === 0
                }
              >
                <Text style={{ textAlign: "center" }}>{x}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ width: "80%" }}>
          <Text style={{textAlign: "center", fontWeight: "bold" }}>{this.checkCondition()}</Text>

          <Text
            style={{
              fontWeight: "bold",
              borderRadius: 5,
              backgroundColor: "lightblue",
              textAlign: "center"
            }}
          >
            Score: {this.score}
          </Text>

          {/* <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Time: {this.state.time}
          </Text> */}
          {/* <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              onChangeText={numOfFelids => this.setState({ numOfFelids })}
              value={this.state.numOfFelids}
            />
            <Button title="Create" onPress={this.generateButtons} /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  disable: {
    backgroundColor: "lightgray",
    padding: 20,
    opacity: 0.3
  },
  enable: {
    backgroundColor: "lightgray",
    padding: 20,
    opacity: 1
  }
});
