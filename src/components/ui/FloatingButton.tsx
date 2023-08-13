import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from '../../constants';

export default function FloatingButton(props:any) {
  const { style, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
    >
        <MaterialIcons
          name="add"
          size={28}
          color={COLORS.white}
        />
    </TouchableOpacity>
  )
}
