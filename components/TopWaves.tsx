import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function TopWaves() {
  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 0,
      pointerEvents: 'none',
      height: 200,
    }}>
      <Svg
        viewBox="0 0 347 97"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          aspectRatio: 345.831 / 96.277,
          flexShrink: 0,
        }}
      >
        <Path
          d="M346.203 81.1161C268.457 97.1835 223.481 105.196 157.265 81.1161L0.372314 0.0413818H346.203V81.1161Z"
          fill="#7C98B3"
        />
      </Svg>
    </View>
  );
}