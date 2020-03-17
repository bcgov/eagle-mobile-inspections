import 'react-native'
import React from 'react'
import { MonoText } from '../StyledText'
import renderer from 'react-test-renderer'

// eslint-disable-next-line no-undef
it('renders correctly', () => {
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON()

  // eslint-disable-next-line no-undef
  expect(tree).toMatchSnapshot()
})
