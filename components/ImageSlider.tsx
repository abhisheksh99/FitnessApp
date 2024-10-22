import React from 'react';
import { View, Image } from 'react-native';
import Carousel from '@demfabris/react-native-snap-carousel';
import { sliderImages } from '../constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ImageSlider = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={{ width: wp(100) - 70, height: hp(25) }}>
        <Image
          source={item}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 30,
            resizeMode: 'cover',
          }}
        />
      </View>
    );
  };

  return (
    <Carousel
      data={sliderImages}
      renderItem={renderItem}
      sliderWidth={wp(100)}
      itemWidth={wp(100) - 70}
      loop={true}
      autoplay={true}
      autoplayInterval={4000}
      firstItem={1}
    />
  );
};

export default ImageSlider;