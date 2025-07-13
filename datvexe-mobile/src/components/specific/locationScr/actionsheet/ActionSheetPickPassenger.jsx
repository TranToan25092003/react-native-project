import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import React from "react";

const ActionSheetPickPassenger = ({ actionSheetPassenger, decreasePassenger, passengerCnt, increasePassenger }) => {
  return (
    <ActionSheet ref={actionSheetPassenger} gestureEnabled={true}>
      <View style={styles.actionSheetContent}>
        <Text style={styles.passengerTitle}>Số lượng người:</Text>
        <View style={styles.passengerControls}>
          <TouchableOpacity
            style={styles.passengerButton}
            onPress={decreasePassenger}
          >
            <Text style={styles.passengerButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.passengerCnt}>{passengerCnt}</Text>
          <TouchableOpacity
            style={styles.passengerButton}
            onPress={increasePassenger}
          >
            <Text style={styles.passengerButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  )
}

export default ActionSheetPickPassenger;