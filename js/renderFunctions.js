import React from 'react';
import {
    Text,
    TouchableHighlight,
    View,
  } from 'react-native';
import { Image } from 'react-native-elements'
export const renderTouchables = (key, imageSource, p, styles) => {
    return (
    <View key={key}>
      <TouchableHighlight key={key} underlayColor='#fff' onPress={() => this.showElement(p)}>
        <Image
          key={key}
          style={styles.image}
          source={imageSource}
        />
      </TouchableHighlight>
      <Text>Caption: {p.caption}</Text>
      <Text>Timestamp: {new Date(p.timestamp).toDateString()}</Text>
    </View>
    )
  }