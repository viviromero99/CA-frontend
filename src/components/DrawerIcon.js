import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {View, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

export default function DrawerIcon(onSelectMenu) {
  return (
    <View>
        <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress = {() => onSelectMenu}>
            <Ionicons name={"ios-menu"} size={27} color="rgba(0,0,0,0.35)"/>
        </TouchableOpacity>
    </View>
  );
}