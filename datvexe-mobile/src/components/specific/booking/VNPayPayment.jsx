import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Alert,
    ActivityIndicator,
    BackHandler
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../../../utils/format';
import { showCustomToast } from '../../common/notifice/CustomToast';

const VNPayPayment = ({ route }) => {
    const navigation = useNavigation();
    const { urlVnPayQr, dataBooking } = route.params;
    const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes countdown
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            Alert.alert(
                'Hết thời gian thanh toán',
                'Phiên thanh toán đã hết hạn. Vui lòng thử lại.',
                [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]
            );
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, navigation]);

    useEffect(() => {
        const backAction = () => {
            Alert.alert(
                'Thoát thanh toán?',
                'Bạn có muốn thoát khỏi trang thanh toán? Giao dịch sẽ không được hoàn thành.',
                [
                    { text: 'Hủy', onPress: () => null, style: 'cancel' },
                    { text: 'Thoát', onPress: () => navigation.goBack() }
                ]
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [navigation]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const handlePaymentSuccess = () => {
        setIsLoading(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsLoading(false);
            showCustomToast('Thanh toán thành công!', 'success');
            navigation.navigate('BookingSuccessScreen', { dataBooking });
        }, 2000);
    };

    const handlePaymentCancel = () => {
        Alert.alert(
            'Hủy thanh toán?',
            'Bạn có chắc chắn muốn hủy thanh toán?',
            [
                { text: 'Không', style: 'cancel' },
                { text: 'Có', onPress: () => navigation.goBack() }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePaymentCancel}>
                    <MaterialIcons name="close" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Thanh toán VNPay</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeLabel}>Thời gian còn lại:</Text>
                    <Text style={styles.timeValue}>
                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </Text>
                </View>

                <View style={styles.qrContainer}>
                    <Text style={styles.qrTitle}>Quét mã QR để thanh toán</Text>
                    <View style={styles.qrImageContainer}>
                        {urlVnPayQr ? (
                            <Image source={{ uri: urlVnPayQr }} style={styles.qrImage} />
                        ) : (
                            <ActivityIndicator size="large" color="#FFA07A" />
                        )}
                    </View>
                    <Text style={styles.qrSubtitle}>
                        Sử dụng app ngân hàng để quét mã QR
                    </Text>
                </View>

                <View style={styles.bookingInfo}>
                    <Text style={styles.bookingTitle}>Thông tin đặt chỗ</Text>
                    <View style={styles.bookingRow}>
                        <Text style={styles.bookingLabel}>Mã đặt vé:</Text>
                        <Text style={styles.bookingValue}>{dataBooking?.code}</Text>
                    </View>
                    <View style={styles.bookingRow}>
                        <Text style={styles.bookingLabel}>Tuyến:</Text>
                        <Text style={styles.bookingValue}>{dataBooking?.busSchedule?.route}</Text>
                    </View>
                    <View style={styles.bookingRow}>
                        <Text style={styles.bookingLabel}>Tổng tiền:</Text>
                        <Text style={styles.bookingValuePrice}>
                            {formatCurrency(dataBooking?.totalPrice)}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.button, styles.successButton]}
                    onPress={handlePaymentSuccess}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Đã thanh toán</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handlePaymentCancel}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonTextCancel}>Hủy thanh toán</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFA07A',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        padding: 12,
        backgroundColor: '#fff3cd',
        borderRadius: 8,
        borderColor: '#ffeaa7',
        borderWidth: 1,
    },
    timeLabel: {
        fontSize: 16,
        color: '#856404',
        marginRight: 8,
    },
    timeValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#856404',
    },
    qrContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    qrTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    qrImageContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        marginBottom: 16,
    },
    qrImage: {
        width: 180,
        height: 180,
        borderRadius: 8,
    },
    qrSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    bookingInfo: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    bookingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    bookingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    bookingLabel: {
        fontSize: 14,
        color: '#666',
    },
    bookingValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    bookingValuePrice: {
        fontSize: 16,
        color: '#FFA07A',
        fontWeight: 'bold',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
    },
    button: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    successButton: {
        backgroundColor: '#28a745',
    },
    cancelButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#dc3545',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonTextCancel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#dc3545',
    },
});

export default VNPayPayment; 