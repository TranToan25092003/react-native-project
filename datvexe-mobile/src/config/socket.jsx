import io from "socket.io-client";

const socket = io("http://10.0.2.2:9999", {
  transports: ["websocket"],
  timeout: 5000, // set timeout ngắn để bắt lỗi nhanh
});

socket.on("connect", () => {
  console.log("✅ Socket connected");
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connect error:", err.message);
});
