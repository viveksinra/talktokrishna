import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Image} from 'react-native';
import MobileCom from '../authComponent/MobileLogin/MobileCom';
import OtpCom from '../authComponent/MobileLogin/OtpCom';
import TermPopup from '../authComponent/MobileLogin/TermPopup';
const image = { uri: "https://www.onlygfx.com/wp-content/uploads/2021/04/white-triangle-pattern-seamless-background-2.jpg" };

const MobileLoginScreen = () => {
  const [mobileNo, setMobileNo] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  return (
    <ImageBackground source={image} style={styles.imageBG}>
      <View style={styles.container}>
    {step === 1 ? (
   <>
   <MobileCom
   setStep = {setStep}
   mobileNo= {mobileNo}
   setMobileNo = {setMobileNo}
   />
   </>
    ) : (
   <>
   <OtpCom
      setStep = {setStep}
      otp= {otp}
      setOtp = {setOtp}
   mobileNo= {mobileNo}

   />
   </>
    )}
    <TermPopup /> 
  </View>
  <Image
        style={styles.image}
        source={{ uri: 'https://res.cloudinary.com/qualifierphoto/image/upload/v1702646398/enter-your-number-for-for-2-step-verification-illustration-concept-vector-removebg-preview_ss2bql.png' }} // Replace with the actual image source
      />
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBG: {
    flex: 1,
    resizeMode: "cover",
  },
  image: {
    width: 350, // Adjust the width as needed
    height: 350, // Adjust the height as needed
    resizeMode: 'cover', // You can change the resizeMode based on your preference
  },
  container:{
    margin:10,
    marginTop:20
  },



});


export default MobileLoginScreen;
