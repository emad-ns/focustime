import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform, AsyncStorage } from "react-native";
import { Focus } from "./src/features/focus/Focus";
import { FocusHistory } from "./src/features/focus/FocusHistory";
import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";
import { Timer } from "./src/features/timer/Timer";

const STATUSES = {
  COMPLETE: 1,
  CANCELED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  //const [focusInput, setFocusInput] = useState('');

  /*useEffect(() => {
    if(focusSubject){
      setFocusHistory([...focusHistory, focusSubject])
    }
  }, [focusSubject])*/

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistroy = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // for load focustHistroy to the app
    loadFocusHistory();
  }, []);

  useEffect(() => {
    // for saving new focus histry to asyncStorage
    saveFocusHistroy();
  }, [focusHistory]);

  /*const onChangeFocusInput = (event) => {
    setFocusInput(event.target.value)
  }*/

  //<Text style={{color: '#FFF'}}>{focusInput}</Text>
  //<Focus addSubject={setFocusSubject} onChangeFocus={onChangeFocusInput} focusInput={focusInput} />
  //<Text style={{color: '#FFF'}}>{focusSubject}</Text>
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
          {/*<View>
          {focusHistory ? focusHistory.map(focusElement => {
            return <Text>`${focusElement.subject}`</Text>
          }) : ''}
        </View>*/}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === "ios" ? spacing.xxl : spacing.xxl,
  },
});
