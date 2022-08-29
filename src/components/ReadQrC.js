import React, { useState, useEffect } from 'react';

import { Text, View, StyleSheet, Button } from 'react-native';


const ReadQrC = ({ newUserId }) => {
useEffect(() => {
  console.log(newUserId)
}, []) 
  return (
    <View>
      <Text>ReadQrC</Text>
    </View>
  )
}

export default ReadQrC