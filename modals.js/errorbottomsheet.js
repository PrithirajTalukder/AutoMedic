import React from "react";
import { View, Text, Button } from "react-native";

const ErrorBottomSheet = ({ errorMessage, dismiss }) => {
  return (
    <View style={styles.bottomSheetContent}>
      <Text>{errorMessage}</Text>
      <Button title="Dismiss" onPress={dismiss} />
    </View>
  );
};

export default ErrorBottomSheet;