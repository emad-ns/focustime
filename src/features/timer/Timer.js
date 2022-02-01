import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  // useKeepAwake is npm for keep the phone awake while the application in this page is running
  useKeepAwake()

  const interval = React.useRef(null)
  const [minutes, setMinutes] = useState(DEFAULT_TIME)
  const [isStarted, setIsStarted] = useState(false)
  const [progress, setProgress] = useState(1)

  const onProgress = (progress) => {
    setProgress(progress)
  }

  const vibrate = () => {
    if(Platform.OS === 'ios'){
      const interval = setInterval(() => Vibration.vibrate(), 1000)
      setTimeout(() => clearInterval(interval), 10000)
    } else {
      Vibration.vibrate('10s')
    }
  }

  const onEnd = () => {
    vibrate()
    setMinutes(DEFAULT_TIME)
    setProgress(1)
    setIsStarted(false)
    onTimerEnd()
  }

  const changeTime = (min) => {
    setMinutes(min)
    setProgress(1)
    setIsStarted(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
      </View>
      <View style={styles.timerWrapper}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm}}>
        <ProgressBar 
          progress={progress}
          color="#5E84E2" 
          style={{ height: 10}}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton  title="pause" size={125} onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton  title="start" size={125} onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton  title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerWrapper: {
    paddingTop: spacing.lg,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSizes.md,
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
  },
  countdown: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: .3,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: spacing.xxl,
    paddingLeft: spacing.xxl,
  }
});
