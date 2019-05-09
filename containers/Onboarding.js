import React from 'react';
import { View, Text, Image } from 'react-native';

import Onboarding from 'react-native-simple-onboarding';

// TODO: fix color glitch when user presses next
const Onboard = (props) => {
  const sourceLine = require('../img/navTabIcons/line.png')
  const sourceInfo = require('../img/navTabIcons/info.png')
  const sourceSuggestions = require('../img/navTabIcons/suggestions.png')
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#ACB7FF',
          image: <Image source={sourceLine} />,
          title: 'Line@KAF',
          subtitle: 'Check how long the wait is before you head to KAF'
        },
        {
          backgroundColor: "#ff9383",
          image: <Image source={sourceInfo} />,
          title: 'View Trends',
          subtitle: 'Explore the best times to go, and what times to avoid' },
        {
          backgroundColor: "#9edb6d",
          image: <Image source={sourceSuggestions} />,
          title: 'Submit suggestions!',
          subtitle: 'Have feedback? Submit them through the Suggestions page'
        },
      ]}
      onEnd={props.finishOnboard}
    />
  )
}

export default Onboard;
