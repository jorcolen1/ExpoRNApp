import React, { useState, useEffect } from "react"
import {View, Text, Button, StyleSheet} from 'react-native'
import { collection, query, where, onSnapshot } from "firebase/firestore";
function UsersList() {
  return (
    <View>
        <Text>
            Users List
        </Text>
    </View>
    )
}

export default UsersList