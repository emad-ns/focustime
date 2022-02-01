import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null)

          //<TextInput style={styles.textInput} onChange={props.onChangeFocus} value={props.focusInput} />
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} onSubmitEditing={
              ({ nativeEvent }) => {
                setSubject(nativeEvent.text)
              }
            } 
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addSubject(subject);
            }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: .5,
  },
  innerContainer: {
    flex: 1,
    //padding: Platform.OS === 'android' ? 17 : 16,
    padding: Platform.OS === 'android' ? spacing.md : spacing.md ,
    justifyContent: "center"
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput:{
    flex: 1,
    marginRight:spacing.md,
  }
});
