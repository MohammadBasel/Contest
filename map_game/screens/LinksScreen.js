import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import React from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  Button,
  TouchableOpacity,
  Dimensions
  /*, StyleSheet*/
} from "react-native";
import { ExpoConfigView } from "@expo/samples";
import MapView, { Callout, PROVIDER_GOOGLE } from "react-native-maps";
import firebase from "firebase";
import { Permissions, ImagePicker } from "expo";
import db from "../db";

const { width, height } = Dimensions.get("window");
export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  state = {
    user: null,
    users: [],
    trucks: [],
    coordsArr: [{ latitude: 25.381649, longitude: 51.479143 }],
    region: {
      latitude: 25.381649,
      longitude: 51.479143,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    selectedBin: null,
    reservationId: null,
    isReserved: false,
    flag: false
  };
  async componentDidMount(){
    // await navigator.geolocation.watchPosition(
    //   position => {
    //     region = {
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421
    //     };
    //     this.setState({ region });

    //   },
    //   error => {
    //     console.warn("Error Code: ", error);
    //   },
    //   {
    //     enableHighAccuracy: true,
    //     timeout: 20000,
    //     maximumAge: 1000
    //   }
    // );
    db.collection(`Players`).onSnapshot(querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ users });
    });
  }


  render() {
    return (
      <View
      style={{
        flex: 1,
        justifyContent: "center"
      }}
    >
        <MapView
            showsCompass={true}
            showsMyLocationButton={true}
            showsUserLocation
            provider={PROVIDER_GOOGLE}
            style={{
              flex: 1,
              width: width,
              height: height,
              zIndex: -1
            }}
            customMapStyle={[
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    color: "#000000"
                  },
                  {
                    weight: 1
                  }
                ]
              }
            ]}
            region={this.state.region}
          >
            {this.state.users.map((user, i) => (
                <MapView.Marker
                key={i}
                  tracksViewChanges
                  ref={marker => {
                    this.marker = marker;
                  }}
                  onPress={()=>this.props.navigation.navigate("Settings", {name: user.id})}
                  coordinate={{
                    latitude: user.Latitude,
                    longitude: user.Longitude
                  }}
                >
                  <Image
                    source={require("../assets/images/pin.png")}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: [
                        user.waiting 
                          ? "green"
                          : "red"]
                      
                    }}
                  />
                  {/* <Callout>
                    <View
                      style={{
                        width: width * 0.5,
                        height: height * 0.15,
                        justifyContent: "center"
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>
                        Bin Id: {"" + bin.id}
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>
                        Bin Level: {"" + bin.Level}%
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>
                        Battery Level: {"" + bin.Battery}%
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>
                        Status: {bin.Status}
                      </Text>
                    </View>
                  </Callout> */}
                </MapView.Marker>
            ))}
           
          </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
