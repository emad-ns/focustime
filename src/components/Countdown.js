import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMilles = (min) => min * 1000 * 60

const formatTime = (time) => time < 10 ? `0${time}` : time 

export const Countdown = ({
  //props
  minutes = .1,
  isPaused = true,
  onProgress,
  onEnd,
  ...props 
}) => {
  const interval = React.useRef(null)
  
  const [millis, setMillis] = useState(minutesToMilles(minutes))
  console.log(millis,minutes)
  
  const countDownIntv = () => {
    setMillis((time) => {
      if (time === 0){
        //do more stuff here
        clearInterval(interval.current);
        return time
      }
      
      const timeLeft = time - 1000
      
      return timeLeft
    })
  }

  useEffect(() => {
    setMillis(minutesToMilles(minutes))
  }, [minutes])

  useEffect(() => {
    // report the progress
    onProgress(millis / minutesToMilles(minutes))
    
    if (millis === 0){
       onEnd()
    }
  }, [millis])

  useEffect(() => {
    if(isPaused){
      if(interval.current) clearInterval(interval.current);
      return;
    }
      interval.current = setInterval(countDownIntv, 1000)

      return () => clearInterval(interval.current)

  }, [isPaused])

  const minute = Math.floor(millis / 1000 / 60) % 60
  const second = Math.floor(millis / 1000) % 60

  return (
    <View>
      <Text style={styles.text}>{formatTime(minute)}:{formatTime(second)}</Text>
    </View>
      
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, .3)',
    textAlign: 'center'
  },
});
