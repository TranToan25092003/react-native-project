import { FlatList, TouchableOpacity } from "react-native";

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