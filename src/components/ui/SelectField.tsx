import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import { COLORS } from '../../constants';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function SelectField(props:any) {
    const { data, placeholder, onSelect } = props;

  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        //console.log(selectedItem, index);
        onSelect(selectedItem, index);
      }}
      buttonStyle={styles.dropdown3BtnStyle}
      renderCustomizedButtonChild={(selectedItem, index) => {
        return (
          <View style={styles.dropdown3BtnChildStyle}>
            {selectedItem ? (
              <Image
                source={{ uri: selectedItem.image }}
                style={styles.dropdown3BtnImage}
              />
            ) : (
              <MaterialIcons
                name="person-outline"
                color={COLORS.gray}
                size={30}
              />
            )}
            <Text style={styles.dropdown3BtnTxt}>
              {selectedItem ? selectedItem.name : placeholder}
            </Text>
            <MaterialIcons name="expand-more" color={COLORS.gray} size={22} />
          </View>
        );
      }}
      dropdownStyle={styles.dropdown3DropdownStyle}
      rowStyle={styles.dropdown3RowStyle}
      renderCustomizedRowChild={(item, index) => {
        return (
          <View style={styles.dropdown3RowChildStyle}>
            <Image
              source={{ uri: item.image }}
              style={styles.dropdownRowImage}
            />
            <Text style={styles.dropdown3RowTxt}>{item.name}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
    dropdown3BtnStyle: {
        width: '100%',
        backgroundColor: COLORS.white,
        paddingHorizontal: 0,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: COLORS.grayMedium,
      },
      dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
      },
      dropdown3BtnImage: {
        width: 35, 
        height: 35,
        resizeMode: 'cover',
        borderRadius:35,
      },
      dropdown3BtnTxt: {
        flex:1,
        color: COLORS.gray,
        textAlign: 'left',
        fontSize: 16,
        marginHorizontal: 12,
      },
      dropdown3DropdownStyle: {
        backgroundColor: COLORS.white
      },
      dropdown3RowStyle: {
        borderColor: COLORS.grayVeryLight,
        borderBottomColor: COLORS.grayVeryLight,
        //height: 50,
      },
      dropdown3RowChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 12,
      },
      dropdownRowImage: {
        width: 35, 
        height: 35,
        resizeMode: 'cover',
        borderRadius:35,
      },
      dropdown3RowTxt: {
        color: COLORS.gray,
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 12,
      },
});
