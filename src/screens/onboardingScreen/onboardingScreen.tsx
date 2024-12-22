/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  height,
  width,
  primaryColor,
  secondaryColor,
  terceryColor,
  fontTitle,
  fontSubtitle,
  fontTextLigth,
} from '../../utils/styles';
import useNavigation from '../../hooks/useNavigation';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleSkipOrDone = () => {
    navigation.navigate('Auth');
  };

  const SkipButton = ({...props}) => (
    <TouchableOpacity style={styles.skipButton} {...props}>
      <Text style={styles.skipText}>Skip</Text>
    </TouchableOpacity>
  );

  const NextButton = ({...props}) => (
    <TouchableOpacity style={styles.nextButton} {...props}>
      <View style={styles.nextContent}>
        <Text style={styles.nextText}>Next</Text>
        <Ionicons
          name="arrow-forward"
          size={18}
          color="#fff"
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );

  const DoneButton = ({...props}) => (
    <TouchableOpacity style={styles.doneButton} {...props}>
      <View style={styles.doneContent}>
        <Text style={styles.doneText}>Get Started</Text>
        <Ionicons name="checkmark" size={25} color="#fff" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      onDone={handleSkipOrDone}
      onSkip={handleSkipOrDone}
      bottomBarHighlight={false}
      containerStyles={styles.container}
      SkipButtonComponent={SkipButton}
      NextButtonComponent={NextButton}
      DoneButtonComponent={DoneButton}
      pages={[
        {
          backgroundColor: primaryColor,
          image: (
            <Image
              source={require('../../assets/img/welcome.png')}
              style={styles.image}
            />
          ),
          title: 'Welcome to SmarCart',
          subtitle: 'Organize, Track, and Simplify Your Shopping Experience!',
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: primaryColor,
          image: (
            <Image
              source={require('../../assets/img/chart.png')}
              style={styles.image}
            />
          ),
          title: 'Shop Smarter, Not Harder',
          subtitle:
            'Easily organize your shopping list by categories like clothing, furniture, and more',
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: primaryColor,
          image: (
            <Image
              source={require('../../assets/img/shopping2.png')}
              style={styles.imagebag}
            />
          ),
          title: 'Stay on Track',
          subtitle: 'Mark items as purchased and focus on what’s left to buy.',
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.9,
    height: height * 0.5,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    color: terceryColor,
    marginBottom: 10,
    fontFamily: fontTitle,
  },
  subtitle: {
    fontSize: 16,
    color: secondaryColor,
    fontFamily: fontSubtitle,
    marginBottom: 90,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width * 0.8,
  },
  imagebag: {
    width: width * 1,
    height: height * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  skipText: {
    color: '#000',
    fontSize: 16,
    fontFamily: fontTextLigth,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: terceryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  nextContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fontTextLigth,
    textAlign: 'center',
    marginRight: 8,
  },
  doneButton: {
    backgroundColor: terceryColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
    position: 'absolute',
    bottom: -25,
    right: 20,
  },
  doneContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fontTextLigth,
    textAlign: 'center',
    marginRight: 8,
  },
  icon: {
    marginLeft: 5,
  },
});

export default OnboardingScreen;
