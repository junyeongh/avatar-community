import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {

  return (
    <SafeAreaProvider>
      {/* <SafeAreaView>
        <Home />
      </SafeAreaView> */}
      <Mission />
    </SafeAreaProvider>
  );
}

function Home() {
  return (
    <>
      <View style={styles.parent_container}>
        <View style={styles.container}>
          <Text style={styles.text}>just a text</Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.text}>just a text</Text>
          <Text style={styles.text}>just a text</Text>
          <Text style={styles.text}>just a text</Text>
        </View>
      </View>
    </>
  )
}
function Mission() {
  return (
    <SafeAreaView style={styles.mission_parent_container}>
      <View style={styles.mission_container1}>
        <Box />
        <Box />
        <Box />
      </View>
      <View style={styles.mission_container2}>
        <Box />
        <Box />
        <Box />
      </View>
      <View style={styles.mission_container3}>
        <Box />
        <Box />
        <Box />
      </View>
    </SafeAreaView>
  );
}

function Box() {
  return <View style={styles.box} />;
}

const styles = StyleSheet.create({
  // [2-1] FlexBox
  parent_container: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: "yellow",
  },
  container2: {
    backgroundColor: "blue",
  },
  text: {
    color: "red",
    fontSize: 30,
  },
  input: {
    fontSize: 30,
  },
  // mission
  mission_parent_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent:'space-between',
  },
  mission_container1: {
    flexDirection: "row",
    justifyContent: 'flex-end',
    gap: 5
  },
  mission_container2: {
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  mission_container3: {
    flexDirection: 'row',
    gap: 5
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
});
