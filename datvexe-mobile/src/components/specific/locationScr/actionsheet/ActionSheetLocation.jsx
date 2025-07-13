import React from 'react';
import { FlatList, StyleSheet } from "react-native";

const ActionSheetLocation = ({ actionSheetRefLocation, currentLocationType, dataLocation, selectLocation }) => {
    const renderLocationItem = ({ item }) => {
        return (
            <View>
                <Text styles={styles.cityHeader}> {item.tenTinh} </Text>
                {
                    item.benXe.map((station) => (
                        <TouchableOpacity
                            key={station._id || Math.random().toString()}
                            style={styles.stationItem}
                            onPress={() => selectLocation(station)}
                        >
                            <Text style={styles.stationText}> {station.tenBenXe} </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        );
    };

    return (
        <ActionSheet ref={actionSheetRefLocation} gestureEnabled={true}>
            <View>
                <Text style={styles.locationActionSheetTitle}>
                    {currentLocationType === "start" ? "Chọn điểm xuất phát" : "Chọn điểm đến"}
                </Text>
                <FlatList
                    data={dataLocation}
                    renderItem={renderLocationItem}
                    keyExtractor={item => item._id || Math.random().toString()}
                />
            </View>
        </ActionSheet>
    )
};

const styles = StyleSheet.create({
    cityHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    stationItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1
    },
    locationActionSheetTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center'
    }
});

export default ActionSheetLocation;