import { StyleSheet } from 'react-native'

// Styles for our views
export const viewFlexColumn = {
  margin: 10,
  flex: 1,
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  alignContent: 'flex-start'
}

// Styles for our main screens
export const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  }
})
export const dateContainerStyles = StyleSheet.create({
  dateContainer: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
export const imageStyles = StyleSheet.create({
  image: {
    width: 85,
    height: 85,
    margin: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  }
})
export const footerStyles = StyleSheet.create({
  footer: {
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    alignContent: 'center'
  }
})
export const containerNoPadding = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
export const flexColumnMarginTop = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 50
  }
})
export const recorderStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignContent: 'center'
  }
})
export const customProjectStyles = StyleSheet.create({
  customProjectStyle: {
    flexDirection: 'row',
    width: window.width,
    margin: 10,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 5
  }
})
export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  footer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    alignContent: 'center'
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row'
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2
  },
  sectionHeaderContainer: {
    backgroundColor: '#fbfbfb',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed'
  },
  sectionHeaderText: {
    fontSize: 14
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15
  },
  sectionContentText: {
    color: '#808080',
    fontSize: 14
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18
  },
  slugText: {
    color: '#a39f9f',
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    color: '#4d4d4d'
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  colorPreview: {
    width: 17,
    height: 17,
    borderRadius: 2,
    marginRight: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc'
  },
  colorTextContainer: {
    flex: 1
  },
  refreshbutton: {
    marginBottom: 10
  },
  forcebutton: {
    marginBottom: 10
  },
  onlinebutton: {
    marginHorizontal: 20
  }
})
export const baseStyles = StyleSheet.compose(containerStyles, dateContainerStyles, imageStyles)

// Our Exports for our Screens
export const elementScreenStyles = baseStyles
export const editElementScreenStyles = baseStyles
export const inspectionDetailsScreenStyles = StyleSheet.compose(baseStyles, footerStyles)
export const inspectionScreenStyles = containerNoPadding
export const previewElementScreenStyles = flexColumnMarginTop
export const recorderScreenStyles = recorderStyles
export const ROInspectionScreenStyles = baseStyles
export const selectProjectScreenStyles = StyleSheet.compose(containerStyles, customProjectStyles)
export const settingsScreenStyles = settingsStyles
export const setupInspectionScreenStyles = baseStyles
