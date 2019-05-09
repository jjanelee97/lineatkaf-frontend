# LineAtKaf

This repo contains the mobile app for the LineAtKaf system. The mobile app is
the user facing part of LineAtKaf. It displays the information useful to the
user, notably the length of the two lines.

## Set up

In order to run this app, you need the following things installed:

- XCode
- Node.js
- NPM (Should come with Node.js)

Clone the repo with the following command:

````
git clone https://github.com/lineatkaf/LineAtKaf.git
````

You then need to install the modules with

````
npm install
````

To initialize the build and run the iOS Simulator, run:

````
react-native run-ios
````

## Note about Dependencies

Dependencies are incredibly finicky in React-Native. Do not change ```package.json```
directly unless you are integrating a new library, in which case it should be done
through the terminal. **Whenever you add a dependency, you must remove the carat
(^) to prevent it from grabbing the latest version** . Please be super careful,
since this stuff is a pain to fix retroactively.


## Code Architecture

`index.ios.js` is the first entry-point in the code.  This is just a basic `TavNavigator` component that imports each of the components in the /navigation folder: `LinePage.js`,`MenuPage.js`, `HoursPage.js`, and `SuggestionsPage.js`.

Each of these components implements a `StackNavigator` from react-navigation in order to handle any view pushes we would want within a certain tab.  (Currently no other views are being pushed onto any tab screen.)

### LinePage.js

* `KafLine.js`
  * `LineBar.js`

### MenuPage.js

* `KafMenu.js`
  * `MenuList.js`

### HoursPage.js

* `KafHours.js`
  * `TrendChart.js`

### SuggestionsPage.js

* `KafSuggestions.js`
