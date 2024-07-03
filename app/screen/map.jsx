// import { SafeAreaView } from "react-native-safe-area-context";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useContext,
// } from "react";
// import { View, StyleSheet, Dimensions } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import { AuthContext } from "../context/authContext";

// const API_KEY = "AIzaSyDexYcLe4DJ-XkXyUYjz_Y7b_L8e_L-Ruk";

// // Coordinates for Delhi
// const center = {
//   latitude: 28.6139,
//   longitude: 77.209,
// };
// const Map = () => {
//   const { allActiveTrip } = useContext(AuthContext);
// //   console.log('===== allActiveTrip ======', allActiveTrip, '======== mainAddress ==========', mainAddress);
//   const mainAddress = allActiveTrip.map((item) => item.pickAddress);
//   const filteredAddresses = mainAddress.filter(
//     (address) => address !== null && address !== undefined
//   );
// //   console.log('=============filteredAddresses =======', filteredAddresses);
// //   const [addresses, setAddresses] = useState(filteredAddresses);
//   const [addresses, setAddresses] = useState([
//     {
//         latitude: 28.59569048387965,
//         longitude: 77.01487854205445
//     },
//     {
//         latitude: 28.663247499913822,
//         longitude: 76.9862044504116
//     }
//   ]);
//   const [directions, setDirections] = useState(null);
//   const mapRef = useRef(null);

//   const fetchRoute = useCallback(() => {
//     if (addresses.length < 2) {
//       console.error("At least two addresses are required to fetch a route.");
//       return;
//     }

//     const office_Address = mainAddress[mainAddress.length - 1].pickAddress;
//     const destination = addresses[addresses.length - 1];
//     const waypoints = addresses
//       .slice(1, -1)
//       .map((address) => ({ location: address }));

//     setDirections({ origin: office_Address, destination, waypoints });
//   }, [addresses]);

//   console.log("-------------- address", addresses);

//   useEffect(() => {
//     fetchRoute();
//   }, [fetchRoute]);

//   return (
//     <SafeAreaView style={styles.idBlock}>
//       <View style={styles.mainView}>
//         <View style={styles.info}>
//           <MapView
//             ref={mapRef}
//             style={styles.map}
//             initialRegion={{
//               latitude: center.latitude,
//               longitude: center.longitude,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//           >
//             {addresses.map((address, index) => (
//               <Marker
//                 key={index}
//                 coordinate={{
//                   latitude: address.latitude,
//                   longitude: address.longitude,
//                 }}
//               />
//             ))}
//             {directions && (
//               <MapViewDirections
//                 origin={directions.origin}
//                 destination={directions.destination}
//                 waypoints={directions.waypoints}
//                 apikey={API_KEY}
//                 strokeWidth={3}
//                 strokeColor="hotpink"
//                 onReady={(result) => {
//                   mapRef.current.fitToCoordinates(result.coordinates, {
//                     edgePadding: {
//                       right: Dimensions.get("window").width / 20,
//                       bottom: Dimensions.get("window").height / 20,
//                       left: Dimensions.get("window").width / 20,
//                       top: Dimensions.get("window").height / 20,
//                     },
//                   });
//                 }}
//                 onError={(errorMessage) => {
//                   console.error(`Error fetching directions: ${errorMessage}`);
//                 }}
//               />
//             )}
//           </MapView>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       ...StyleSheet.absoluteFillObject,
//       height: 400,
//       width: 400,
//       justifyContent: "flex-end",
//       alignItems: "center",
//     },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   idBlock: {
//     backgroundColor: "#ffff",
//     borderColor: "grey",
//     paddingVertical: 10,
//     flex: 1,
//   },
// });

// export default Map;
