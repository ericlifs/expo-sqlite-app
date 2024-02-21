import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const ModalScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Add new product' }} />
      <Text>Modal</Text>
    </View>
  );
};

export default ModalScreen;
