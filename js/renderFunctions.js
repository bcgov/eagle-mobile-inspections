import React from 'react'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { Image } from 'react-native-elements'
export const renderTouchables = (key, imageSource, item, styles, showFunction) => {
  return (
    <View key={key}>
      <TouchableHighlight key={key} underlayColor='#fff' onPress={showFunction}>
        <Image
          key={key}
          style={styles.image}
          source={imageSource}
        />
      </TouchableHighlight>
      <Text>Caption: {item.caption}</Text>
      <Text>Timestamp: {new Date(item.timestamp).toDateString()}</Text>
    </View>
  )
}
