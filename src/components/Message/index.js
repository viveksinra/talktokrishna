import { View, Text, StyleSheet, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import Slider from '@react-native-community/slider';

import React, { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Audio } from 'expo-av';
dayjs.extend(relativeTime);
import { Ionicons } from '@expo/vector-icons';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const Message = ({ message }) => {
  const isMyMessage = () => {
    return message.user.id === 'userId';
  };
  const [audioDuration, setAudioDuration] = useState(0);

  // State to track whether the audio is currently playing
  const [isPlaying, setIsPlaying] = useState(false);
  // Audio object reference
  const audioRef = useRef(null);
  // State to track audio playback progress
  const [progress, setProgress] = useState(0);
  // State to track elapsed time
  const [elapsedTime, setElapsedTime] = useState(0);

  // Function to play or pause the audio
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

  // Function to update progress when the audio is playing
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

  // Function to handle seeking
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

  // Cleanup function to unload the audio when the component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current !== null) {
        audioRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
          alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
          minWidth: '50%',
        },
      ]}
    >
      {message.messageType === 'audioAndText' ? (
        <>
          <View style={styles.audioPlayer}>
            <TouchableOpacity onPress={playPauseAudio}>
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={24}
                color="blue"
              />
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
          <Text>{message.text}</Text>
        </>
      ) : (
        <Text>{message.text}</Text>
      )}
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    </View>
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
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  time: {
    color: 'gray',
    alignSelf: 'flex-end',
  },
  audioButton: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 5,
    textDecorationLine: 'underline',
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
});

export default Message;
