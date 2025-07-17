import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import Toast from "react-native-toast-message";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/Ionicons";

const App = () => {
  const [display, setDisplay] = useState(false);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          {display ? (
            <View style={styles.fullscreen}>
              <WebView
                source={{
                  uri: "https://biduck5.app.n8n.cloud/webhook/65590930-b872-4a8f-968f-f7e502d7f9fe/chat",
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                originWhitelist={["*"]}
                style={{ flex: 1, height: "auto" }}
              />
              {/* Nút đóng chat */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setDisplay(false)}
              >
                <Icon name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : (
            // Nút mở chat
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => setDisplay(true)}
            >
              <Icon name="chatbubble-ellipses" size={28} color="#fff" />
            </TouchableOpacity>
          )}
          <AppNavigator />
        </View>

        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  fullscreen: {
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    zIndex: 10,
  },
  chatButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#2196F3",
    borderRadius: 50,
    padding: 16,
    elevation: 4,
    zIndex: 5,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#000000aa",
    padding: 10,
    borderRadius: 20,
    zIndex: 11,
  },
});
export default App;
