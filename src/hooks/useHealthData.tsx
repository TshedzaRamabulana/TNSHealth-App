import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
} from 'react-native-health';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';
import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned, // ✅ iOS calorie permission
    ],
    write: [],
  },
};

const useHealthData = (date: Date) => {
  const [hasPermissions, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);

  // ✅ iOS: HealthKit setup
  useEffect(() => {
    if (Platform.OS !== 'ios') return;

    AppleHealthKit.isAvailable((err, isAvailable) => {
      if (err || !isAvailable) {
        console.log('Apple Health not available');
        return;
      }

      AppleHealthKit.initHealthKit(permissions, (err) => {
        if (err) {
          console.log('Error initializing HealthKit');
          return;
        }
        setHasPermission(true);
      });
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions || Platform.OS !== 'ios') return;

    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getStepCount(options, (err, result) => {
      if (!err && result) setSteps(result.value);
    });

    AppleHealthKit.getFlightsClimbed(options, (err, result) => {
      if (!err && result) setFlights(result.value);
    });

    AppleHealthKit.getDistanceWalkingRunning(options, (err, result) => {
      if (!err && result) setDistance(result.value);
    });

    AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
      if (!err && Array.isArray(results)) {
        const total = results.reduce((sum, item) => sum + item.value, 0);
        setCalories(total);
      }
      }
    );
  }, [hasPermissions, date]);

  // ✅ Android - Health Connect
  const readSampleData = async () => {
    const isInitialized = await initialize();
    if (!isInitialized) return;

    const granted = await requestPermission([
      { accessType: 'read', recordType: 'Steps' },
      { accessType: 'read', recordType: 'Distance' },
      { accessType: 'read', recordType: 'FloorsClimbed' },
      { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
    ]);

    if (!granted) return;

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const timeRangeFilter: TimeRangeFilter = {
      operator: 'between',
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    };

    const stepRecords = await readRecords('Steps', { timeRangeFilter });
    const totalSteps = stepRecords.reduce((sum, cur) => sum + cur.count, 0);
    if (totalSteps !== steps) setSteps(totalSteps);

    const distanceRecords = await readRecords('Distance', { timeRangeFilter });
    const totalDistance = distanceRecords.reduce(
      (sum, cur) => sum + cur.distance.inMeters,
      0
    );
    if (totalDistance !== distance) setDistance(totalDistance);

    const floorRecords = await readRecords('FloorsClimbed', {
      timeRangeFilter,
    });
    const totalFloors = floorRecords.reduce((sum, cur) => sum + cur.floors, 0);
    if (totalFloors !== flights) setFlights(totalFloors);

    const calorieRecords = await readRecords('ActiveCaloriesBurned', {
      timeRangeFilter,
    });
    const totalCalories = calorieRecords.reduce(
      (sum, cur) => sum + cur.energy.inKilocalories,
      0
    );
    if (totalCalories !== calories) setCalories(totalCalories);
  };

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const fetchAndUpdate = async () => await readSampleData();

    const intervalId = setInterval(fetchAndUpdate, 10000); // every 10 seconds
    fetchAndUpdate();

    return () => clearInterval(intervalId);
  }, [date]);

  return {
    steps,
    flights,
    distance,
    calories,
  };
};

export default useHealthData;


