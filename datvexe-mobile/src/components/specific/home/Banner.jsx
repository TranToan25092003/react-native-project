import React from 'react';
import { Image, StyleSheet } from 'react-native';
const bannerData = [
    require('../../../assets/banner1.png'),
    require('../../../assets/banner2.png'),
    require('../../../assets/banner3.png'),
    require('../../../assets/banner4.png')
];

const Banner = () => {
    return (
        <Swiper

        >
            <Image source={require('../../assets/imageBanner/1.jpg')} style={styles.bannerImage} />
            <Image source={require('../../assets/imageBanner/2.jpg')} style={styles.bannerImage} />
            <Image source={require('../../assets/imageBanner/3.jpg')} style={styles.bannerImage} />
            <Image source={require('../../assets/imageBanner/4.jpg')} style={styles.bannerImage} />
            <Image source={require('../../assets/imageBanner/5.jpg')} style={styles.bannerImage} />
            <Image source={require('../../assets/imageBanner/6.jpg')} style={styles.bannerImage} />
        </Swiper>
    )
};

const styles = StyleSheet.create({
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 15,
        opacity: 0.9,
    }
});

export default Banner;