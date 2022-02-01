import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, SafeAreaView, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const HistoryItem = ({item,index}) => {
  return (
    <Text style={styles.historyItem(item.status)}>
      {/*JSON.stringify(item)*/}
      {item.subject}
    </Text>
  )
}

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear()
  }

  return (
     <>
         <SafeAreaView style={styles.safeAreaView}>
          {!!focusHistory.length && (
            <>
              <Text style={styles.title}>Thing's we've focused on</Text>
              <FlatList
                style={{width: '100%', height: '100%'}}
                contentContainerStyle={{ flex:1, alignItems: 'center' }}
                data={focusHistory}
                renderItem={HistoryItem}
              /> 
              <View style={styles.clearContainer}>
                <RoundedButton size={75} title="Clear" onPress={() => onClear()} />
              </View>
            </>
          )}
        </SafeAreaView>
        
        </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: .5,
    alignItems: 'center', 
  },
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green', 
    fontSize: fontSizes.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
    marginBottom:spacing.sm,
  }
});
