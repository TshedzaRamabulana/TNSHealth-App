import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import { useState } from 'react';
import useHealthData from './src/hooks/useHealthData';
import { AntDesign } from '@expo/vector-icons';

const STEPS_GOAL = 10_000;

export default function App() {
  const [date, setDate] = useState(new Date());
  const { steps, flights, distance } = useHealthData(date);

  const changeDate = (numDays: number) => {
  const currentDate = new Date(date);
  currentDate.setDate(currentDate.getDate() + numDays);
  setDate(currentDate);
};

  return (
    <View style={styles.container}>
      {/*  Logo Above Everything */}
      <Image
        source={require('./assets/logo.png')} // make sure the file is here
        style={styles.logo}
        resizeMode="contain"
      />

      {/*  Date Picker */}
      <View style={styles.datePicker}>
        <AntDesign
          onPress={() => changeDate(-1)}
          name="left"
          size={20}
          color="#C3FF53"
        />
        <Text style={styles.date}>{date.toDateString()}</Text>
        <AntDesign
          onPress={() => changeDate(1)}
          name="right"
          size={20}
          color="#C3FF53"
        />
      </View>

      <RingProgress
        radius={150}
        strokeWidth={50}
        progress={steps / STEPS_GOAL}
      />

    <View style={styles.values}>
      <Value label="Steps" value={`${steps} / 10,000`} />
      <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
      <Value label="Flights Climbed" value={flights.toString()} />
    </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12,
  },
  logo: {
    width: 200,
    height: 70,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  datePicker: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  date: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
    marginHorizontal: 20,
  },
  values: {
    flexDirection: 'row',
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 100,
  },
});
