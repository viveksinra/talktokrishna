import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Image} from 'react-native';
const image = { uri: "https://www.onlygfx.com/wp-content/uploads/2021/04/white-triangle-pattern-seamless-background-2.jpg" };

const OtpCom = ({setStep,otp,setOtp,phone}) => {
    const handleVerify = () => {
        // verify OTP with server and login
      };
    
      const handleResend = () => {
        // resend OTP to phone number
      };
    return (
        <>
   
         <View>
         <Text style={styles.title}>OTP Verification</Text>
         <Text style={styles.subtitle}>
           We have sent you an OTP to verify your Mobile Number
         </Text>
         <TouchableOpacity onPress={() => setStep(1)}>
         <Text style={styles.resendText}>Edit {phone}</Text>
       </TouchableOpacity>
         <View style={styles.form}>
           <Text style={styles.label}>Code</Text>
           <TextInput
             style={styles.input}
             placeholder="Enter OTP"
             keyboardType="number-pad"
             value={otp}
             onChangeText={setOtp}
             maxLength={6}
 
           />
         </View>
       </View>
       <TouchableOpacity
      style={styles.button}
      onPress={ handleVerify}>
      <Text style={styles.buttonText}>{'Verify'}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleResend}>
        <Text style={styles.resendText}>Didn't receive a code? Resend code</Text>
      </TouchableOpacity>
       </>
    )

}

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
      marginTop:100
    },
    title: {
      color: '#000000', // changed from white to black
      fontSize: 28,
      fontWeight: '700',
      marginBottom: 8,
    },
    subtitle: {
      color: 'rgba(0, 0, 0, 0.6)', // changed from light gray to dark gray
      fontSize: 17,
      fontWeight: '400',
      marginBottom: 12,
  
    },
    form: {
      backgroundColor: 'white',
      borderColor:"black",
      borderWidth: 1,
      borderRadius: 12,
      flexDirection: 'row',
      height: 48,
      width: '100%',
      marginBottom: 16,
      opacity: 0.8,
      marginTop:24,
    },
    label: {
      color: '#000000', // changed from light gray to black
      fontSize: 25,
      fontWeight: '400',
      width: 80,
      textAlign: 'center',
      textAlignVertical: 'center',
      borderColor:"black",
      borderWidth: 1,
      borderRadius: 8,
    },
    input: {
      color: 'black', // changed from white to black
      flex: 1,
      fontSize: 35,
      fontWeight: '400',
      paddingHorizontal: 16,
    },
    button: {
      backgroundColor: 'rgb(255, 165, 0)', // changed from purple to orange
      borderRadius: 8,
      height: 48,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      opacity: 0.9,
    },
    buttonText: {
      color: '#000000', // changed from white to black
      fontSize: 17,
      fontWeight: '600',
    },
    resendText: {
      color: '#000000', // changed from white to black
      fontSize: 15,
      fontWeight: '400',
      textDecorationLine: 'underline',
    },
    termsText: {
      color: 'rgba(0, 0, 0, 0.6)', // changed from light gray to dark gray
      fontSize: 15,
      fontWeight: '400',
      marginTop: 16,
    },
  });
export default OtpCom;