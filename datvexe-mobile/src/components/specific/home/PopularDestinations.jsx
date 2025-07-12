import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const popularDestinations = [
    {
        id: 1,
        title: "Hà Nội - Lào Cai",
        price: "485.000đ",
        duration: "11h",
        image: require("../../../assets/anhxe1.png"),
    },
    {
        id: 2,
        title: "Lào Cai - Sapa",
        price: "150.000đ",
        duration: "2h",
        image: require("../../../assets/anhxe2.png"),
    },
    {
        id: 3,
        title: "Hà Nội - Sapa",
        price: "350.000đ",
        duration: "6h",
        image: require("../../../assets/anhxe3.png"),
    },
    {
        id: 4,
        title: "Nội Bài - Lào cai",
        price: "350.000đ",
        duration: "6h",
        image: require("../../../assets/anhxe4.png"),
    },
];

const PopularDestinations = () => {
    const navigation = useNavigation();
    const renderDestination = ({item}) => (
        <TouchableOpacity>
            <Image />
            <View>
                <Text></Text>
                <View>
                    <Text></Text>
                    <View>
                        <Icon />
                        <Text></Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return(
        <FlatList />
    );
}

const styles = StyleSheet.create({});

export default PopularDestinations;