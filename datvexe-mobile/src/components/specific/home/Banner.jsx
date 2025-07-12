import React from 'react';
import { Image, StyleSheet} from 'react-native';
const bannerData = [];

const Banner = () => {
    return (
        <Swiper>
            <Image source={require('../../assets/imageBanner/1.jpg')} style={styles.image} />
            <Image source={require('../../assets/imageBanner/2.jpg')} style={styles.image} />
            <Image source={require('../../assets/imageBanner/3.jpg')} style={styles.image} />
            <Image source={require('../../assets/imageBanner/4.jpg')} style={styles.image} />
            <Image source={require('../../assets/imageBanner/5.jpg')} style={styles.image} />
            <Image source={require('../../assets/imageBanner/6.jpg')} style={styles.image} />
        </Swiper>
    )
}

export default Banner;