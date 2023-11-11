import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';


const DonateComponent = () => {
  const {t} = useTranslation();

  const amounts = [1, 5, 11, 21, 51, 101, 251, 501, 1100, 2100, 5100, 11000];
  const [selectedAmount, setSelectedAmount] = useState(21);
  const handlePayment = () => {
    // Replace 'YOUR_PAYMENT_LINK_HERE' with the actual payment link you want to open
    const paymentLink = `https://qualifier.co.in/api/talkToGod/Payment/takePayment/take/${selectedAmount}`;
  
    Linking.openURL(paymentLink)
      .catch(error => {
        console.error('Error opening payment link:', error);
        // You can display an error message to the user if the link couldn't be opened
      });
  };
  

  const handleAmountChange = (amount) => {
    setSelectedAmount(amount);
  };

  const handleIncrement = () => {
    const currentIndex = amounts.indexOf(selectedAmount);
    if (currentIndex < amounts.length - 1) {
      const nextAmount = amounts[currentIndex + 1];
      setSelectedAmount(nextAmount);
    }
  };

  const handleDecrement = () => {
    const currentIndex = amounts.indexOf(selectedAmount);
    if (currentIndex > 0) {
      const previousAmount = amounts[currentIndex - 1];
      setSelectedAmount(previousAmount);
    }
  };

  return (
    <LinearGradient
      colors={['#2a80eb', '#c0d9ed']}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{t('doante.title')}</Text>
        <Text style={styles.subtitle}>{t('doante.subtitle')}</Text>
        <View style={styles.amountContainer}>
          <TouchableOpacity onPress={handleDecrement}>
            <FontAwesome name="minus" size={24} color="#ccc" style={styles.icon} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={selectedAmount.toString()}
            onChangeText={handleAmountChange}
            textAlign="center"
            fontSize={28}
          />
          <TouchableOpacity onPress={handleIncrement}>
            <FontAwesome name="plus" size={24} color="#ccc" style={styles.icon} />
          </TouchableOpacity>
        </View>
     
        <TouchableOpacity style={styles.donateButton} onPress={handlePayment}>
      <Text style={styles.donateButtonText}>{t('donate.buttom')}</Text>
    </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    fontSize: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#fff',
    textAlign: 'center',
  },
  donateButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  donateButtonText: {
    color: '#2a80eb',
    fontWeight: 'bold',
    fontSize: 18,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
},
    icon: {
        marginHorizontal: 10,
        },
    }
        
        );
        
        export default DonateComponent;
 
