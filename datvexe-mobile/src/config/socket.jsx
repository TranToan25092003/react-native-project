import { Platform } from 'react-native'; // Nếu dùng trong React Native
import io from "socket.io-client";

const isWeb = typeof window !== 'undefined';
const isAndroidEmulator = !isWeb && Platform?.OS === 'android';
const isProduction = process.env.NODE_ENV === 'production';

let socketUrl = "";

if (isProduction) {
  socketUrl = "https://api.datvexe-manage.id.vn"; // Production domain
} else if (isWeb) {
  socketUrl = "http://localhost:9999"; // Web (localhost)
} else if (isAndroidEmulator) {
  socketUrl = "http://10.0.2.2:9999"; // Android emulator
} else {
  socketUrl = "http://192.168.1.100:9999"; // IP LAN thật nếu chạy thiết bị thật
}

const socket = io(socketUrl, {
  transports: ["websocket"],
  timeout: 5000,
});

socket.on("connect", () => {
  console.log("✅ Socket connected");
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connect error:", err.message);
});

export default socket;
