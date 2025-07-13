import React from 'react';
import { FlatList, StyleSheet } from "react-native";

const ActionSheetLocation = ({ actionSheetRefLocation, currentLocationType, dataLocation, selectLocation }) => {
    const renderLocationItem = ({ item }) => {
        return (
            <View>
                <Text> {item.tenTinh} </Text>
                {
                    item.benXe.map((station) => (
                        <TouchableOpacity
                            key={station._id || Math.random().toString()}
                            style={styles.stationItem}
                            onPress={() => selectLocation(station)}
                        >
                            <Text> {station.tenBenXe} </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        );
    };

    return (
        <ActionSheet>
            <View>
                <Text>Chọn điểm xuất phát</Text>
                <Text>Chọn điểm đến</Text>
                <FlatList />
            </View>
        </ActionSheet>
    )
};


const styles = StyleSheet.create({

});

export default ActionSheetLocation;