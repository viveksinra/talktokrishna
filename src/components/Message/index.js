import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Ionicons } from '@expo/vector-icons';
import duration from 'dayjs/plugin/duration';
import ActionButton from './actionButton';

dayjs.extend(relativeTime);
dayjs.extend(duration);

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Message = ({ message }) => {
  const isMyMessage = () => {
    return message.userType === 'user';
  };

  const [audioDuration, setAudioDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lgColor,setLgColor] = useState(['#88fcb8', '#00b894'])
  const allUserColor = [
    ['#ff6e7f', '#bfe9ff'],
    ['#ee9ca7', '#ffdde1'],
]
  const allGodColor = [
    ['#ffafbd', '#ffc3a0'],
    ['#88fcb8', '#00b894'],
    ['#FFD580', '#f39c12'],
]


  const playPauseAudio = async () => {
    try {
      if (audioRef.current === null) {
        const { sound } = await Audio.Sound.createAsync({ uri: message.audioUrl }, { shouldPlay: true });
        audioRef.current = sound;
        audioRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      }

      if (isPlaying) {
        await audioRef.current.pauseAsync();
      } else {
        await audioRef.current.playAsync();
      }

      setIsPlaying((prevState) => !prevState);
    } catch (error) {
      console.log('Error playing/pausing audio:', error);
    }
  };

  const onPlaybackStatusUpdate = async (status) => {
    if (status.isLoaded) {
      setAudioDuration(status.durationMillis);

      if (status.isPlaying) {
        setProgress(status.positionMillis / status.durationMillis);
        setElapsedTime(status.positionMillis);
      }

      if (status.didJustFinish) {
        await audioRef.current.stopAsync();
        setIsPlaying(false);
        setProgress(0);
        setElapsedTime(0);
      }
    }
  };

  const onSeek = async (value) => {
    try {
      if (audioRef.current !== null) {
        const status = await audioRef.current.getStatusAsync();
        await audioRef.current.setPositionAsync(value * status.durationMillis);
      }
    } catch (error) {
      console.log('Error seeking:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current !== null) {
        audioRef.current.unloadAsync();
      }
    };
  }, []);
  useEffect(() => {
    const randomUserIndex = Math.floor(Math.random() * allUserColor?.length);
    const randomGodIndex = Math.floor(Math.random() * allUserColor?.length);
    if(isMyMessage()){
      // User color
      setLgColor(allUserColor[randomUserIndex]);
    }else{
      // God color
      setLgColor(allGodColor[randomGodIndex]);
    }
  }, []);

  const gradientColors = isMyMessage() ? lgColor : lgColor;
  const gradientLocations = [0, 1];

  return (
    <AnimatedLinearGradient
      colors={gradientColors}
      locations={gradientLocations}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        styles.container,
        {
          alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
          minWidth: '50%',
        },
      ]}
    >
      <Text style={styles.sender}>{isMyMessage() ?"You":"Krishna"}</Text>
      {message.messageType === 'audioAndText' ? (
        <>
          <View style={styles.audioPlayer}>
            <TouchableOpacity onPress={playPauseAudio}>
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="blue" />
            </TouchableOpacity>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={progress}
              onValueChange={onSeek}
            />
            <Text style={styles.progressText}>
              {isPlaying
                ? dayjs.duration(elapsedTime).format('mm:ss')
                : dayjs.duration(audioDuration).format('mm:ss')}
            </Text>
          </View>
          <Text style={styles.text}>{message.text}</Text>
        </>
      ) : (
        <Text style={styles.text}>{message.text}</Text>
      )}
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    {/* <ActionButton /> */}
    </AnimatedLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  time: {
    color: 'gray',
    alignSelf: 'flex-end',
  },
  sender: {
    color: 'gray',
    alignSelf: 'flex-start',
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
    marginRight: 5,
  },
  progressText: {
    color: 'gray',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default Message;
