const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'orange'
  },
  topButtons: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'center',
    height: 50,
    marginTop: 40
  },
  centeredBottomButton: {
    flex: 0.1,
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center'
  },
  bottomButtons: {
    flex: 0.1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  testContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles
