const isWeb = typeof window !== 'undefined';
const isAndroidEmulator = !isWeb && Platform?.OS === 'android';
const isProduction = process.env.NODE_ENV === 'production';

let baseUrl = "";

if (isProduction) {
  baseUrl = "https://api.datvexe-manage.id.vn"; // Production domain
} else if (isWeb) {
  baseUrl = "http://localhost:9999"; // Web dev (trình duyệt)
} else if (isAndroidEmulator) {
  baseUrl = "http://10.0.2.2:9999"; // Android emulator
} else {
  baseUrl = "http://192.168.1.x:9999"; // fallback cho device thật
}

const headers = {
  "Content-Type": "application/json",
};

const getAuthHeaders = (token) => ({
  ...headers,
  Authorization: `Bearer ${token}`,
});

const apiConfig = {
  baseUrl,
  headers,
  getAuthHeaders,
};

export default apiConfig;
