# bcgov / eagle-mobile-inspections

A mobile application built using [Rect Native](https://facebook.github.io/react-native/) and [Redux](https://github.com/reduxjs/react-redux).  It is a field inspections app compatible with the EPIC API.

![image](https://github.com/bcgov/eagle-mobile-inspections/blob/develop/images/screenshots.png)

## Features

* Image Capture
* Import from Camera Roll
* Video Capture
* Voice Recording
* Theodolite launcher
* Custom Project Name vs. list from EPIC API
* Offline capability (_Cellular data connection required for uploading_)

## Dev Environment Setup

You should be familiar with React Native development.  If not you can [Learn the Basics](https://facebook.github.io/react-native/docs/tutorial) by following the [React Native Tutorial](https://facebook.github.io/react-native/docs/tutorial).

### Requirements

* Apple MacIntosh Computer
* Yarn or NPM globally installed.
* Brew (for installing node/watchman)
* NodeJS v10.0.0+
* XCode 11+

### Get the code

```
git clone git@github.com:bcgov/bcgov/eagle-mobile-inspections.git
cd eagle-mobile-inspections
yarn
brew install node
brew install watchman
```

At this point you should have all that you need in order to run the iOS from Xcode.  Open up XCode and point to the ./ios/eagleMobile.xcodeproj file.  See screenshot below of XCode with the mobile application project open.

![image](https://github.com/bcgov/eagle-mobile-inspections/blob/develop/images/XCode.png)

You can run the dev version or the production version by changing the build target.  The screenshot above shows eagleMobile DEV target.


## Related projects

Eagle is a revision name of the EAO EPIC application suite.

These projects comprise EAO EPIC:

* <https://github.com/bcgov/eagle-api>
* <https://github.com/bcgov/eagle-public>
* <https://github.com/bcgov/eagle-admin>
* <https://github.com/bcgov/eagle-mobile-inspections>
* <https://github.com/bcgov/eagle-common-components>
* <https://github.com/bcgov/eagle-reports>
* <https://github.com/bcgov/eagle-helper-pods>
* <https://github.com/bcgov/eagle-dev-guides>

## Limitations

The iOS project has been focused on and Android has not been a device requirement, as such Android is not currently supported.
