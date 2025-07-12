import ApiConfig from '../api/ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkToken } from '../utils/auth';

class AuthService {
    constructor() {
        this.baseURL = ApiConfig.baseUrl;
    }

    async login(data) {
        try {
            const response = await fetch(`${this.baseURL}/auth/login`, {
                method: 'POST',
                headers: ApiConfig.headers,
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Đăng nhập thất bại');
            }

            // Save token to AsyncStorage
            if (responseData.token) {
                await AsyncStorage.setItem('token', responseData.token);
            }

            return responseData;
        } catch (error) {
            throw new Error(error.message || 'Đăng nhập thất bại');
        }
    }

    async register(userData) {
        try {
            const response = await fetch(`${this.baseURL}/auth/register`, {
                method: 'POST',
                headers: ApiConfig.headers,
                body: JSON.stringify(userData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Đăng ký thất bại');
            }

            return responseData;
        } catch (error) {
            throw new Error(error.message || 'Đăng ký thất bại');
        }
    }

    async getUser() {
        try {
            const token = await checkToken();
            if (!token) {
                throw new Error('Không tìm thấy token');
            }

            const response = await fetch(`${this.baseURL}/auth/user`, {
                method: 'GET',
                headers: ApiConfig.getAuthHeaders(token),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Không thể lấy thông tin người dùng');
            }

            return responseData;
        } catch (error) {
            throw new Error(error.message || 'Không thể lấy thông tin người dùng');
        }
    }

    async updateProfile(profileData) {
        try {
            const token = await checkToken();
            if (!token) {
                throw new Error('Không tìm thấy token');
            }

            const response = await fetch(`${this.baseURL}/auth/profile`, {
                method: 'PUT',
                headers: ApiConfig.getAuthHeaders(token),
                body: JSON.stringify(profileData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Cập nhật thông tin thất bại');
            }

            return responseData;
        } catch (error) {
            throw new Error(error.message || 'Cập nhật thông tin thất bại');
        }
    }

    async changePassword(passwordData) {
        try {
            const token = await checkToken();
            if (!token) {
                throw new Error('Không tìm thấy token');
            }

            const response = await fetch(`${this.baseURL}/auth/change-password`, {
                method: 'PUT',
                headers: ApiConfig.getAuthHeaders(token),
                body: JSON.stringify(passwordData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Đổi mật khẩu thất bại');
            }

            return responseData;
        } catch (error) {
            throw new Error(error.message || 'Đổi mật khẩu thất bại');
        }
    }

    async logout() {
        try {
            // Remove token from AsyncStorage
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            return true;
        } catch (error) {
            throw new Error('Đăng xuất thất bại');
        }
    }

    async verifyEmail(userId) {
        try {
            const response = await fetch(`${this.baseURL}/auth/email/verify/${userId}`, {
                method: 'GET',
                headers: ApiConfig.headers,
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Xác thực email thất bại');
            }

            return responseData;
        } catch (error) {
            throw new Error(error.message || 'Xác thực email thất bại');
        }
    }

    async forgotPassword(email) {
        try {
            const response = await fetch(`${this.baseURL}/auth/forgot-password`, {
                method: 'POST',
                headers: ApiConfig.headers,
                body: JSON.stringify({ email }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Gửi email đặt lại mật khẩu thất bại');
            }

            return responseData;
        } catch (error) {
            throw new Error(error.message || 'Gửi email đặt lại mật khẩu thất bại');
        }
    }

    async resetPassword(token, newPassword) {
        try {
            const response = await fetch(`${this.baseURL}/auth/reset-password`, {
                method: 'POST',
                headers: ApiConfig.headers,
                body: JSON.stringify({ token, newPassword }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Đặt lại mật khẩu thất bại');
            }

            return responseData;
        } catch (error) {
            throw new Error(error.message || 'Đặt lại mật khẩu thất bại');
        }
    }

    async refreshToken() {
        try {
            const token = await checkToken();
            if (!token) {
                throw new Error('Không tìm thấy token');
            }

            const response = await fetch(`${this.baseURL}/auth/refresh`, {
                method: 'POST',
                headers: ApiConfig.getAuthHeaders(token),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Làm mới token thất bại');
            }

            // Save new token
            if (responseData.token) {
                await AsyncStorage.setItem('token', responseData.token);
            }

            return responseData;
        } catch (error) {
            throw new Error(error.message || 'Làm mới token thất bại');
        }
    }
}

export default new AuthService(); 