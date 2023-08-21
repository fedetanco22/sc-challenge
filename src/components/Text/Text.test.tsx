import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import Text from './Text'

test('should render with default props and "span" tag', () => {
  const { getByText } = render(<Text>Hello World</Text>)
  expect(getByText(/Hello World/).tagName).toEqual('SPAN')
  expect(getByText(/Hello World/)).toHaveClass('text', 'white', 'left')
})

test('should render with different text variants', () => {
  const { getByText } = render(
    <div>
      <Text variant="headline-1">Headline1</Text>
      <Text variant="headline-2">Headline2</Text>
      <Text variant="headline-4">Headline4</Text>
      <Text variant="body-1">Body1</Text>
      <Text variant="body-2">Body2</Text>
      <Text variant="caption">Caption</Text>
      <Text variant="hairline">Hairline</Text>
    </div>
  )
  expect(getByText(/Headline1/)).toHaveClass('headline-1')
  expect(getByText(/Headline2/)).toHaveClass('headline-2')
  expect(getByText(/Headline4/)).toHaveClass('headline-4')
  expect(getByText(/Body1/)).toHaveClass('body-1')
  expect(getByText(/Body2/)).toHaveClass('body-2')
  expect(getByText(/Caption/)).toHaveClass('caption')
  expect(getByText(/Hairline/)).toHaveClass('hairline')
})

test('should use different tags for the text', () => {
  const { getByText } = render(
    <div>
      <Text as="h1">Heading 1</Text>
      <Text as="h2">Heading 2</Text>
      <Text as="h3">Heading 3</Text>
      <Text as="p">Paragraph</Text>
      <Text as="a">Link</Text>
    </div>
  )
  expect(getByText(/Heading 1/).tagName).toEqual('H1')
  expect(getByText(/Heading 2/).tagName).toEqual('H2')
  expect(getByText(/Heading 3/).tagName).toEqual('H3')
  expect(getByText(/Paragraph/).tagName).toEqual('P')
  expect(getByText(/Link/).tagName).toEqual('A')
})

test('should handle different colors', () => {
  const { getByText } = render(
    <div>
      <Text color="primary">Primary</Text>
      <Text color="secondary">Secondary</Text>
      <Text color="light">Light</Text>
    </div>
  )
  expect(getByText(/Primary/)).toHaveClass('primary')
  expect(getByText(/Secondary/)).toHaveClass('secondary')
  expect(getByText(/Light/)).toHaveClass('light')
})

test('should handle font weight', () => {
  const { getByText } = render(
    <div>
      <Text fontWeight="normal">Normal</Text>
      <Text fontWeight="medium">Medium</Text>
      <Text fontWeight="bold">Bold</Text>
    </div>
  )
  expect(getByText(/Normal/)).toHaveClass('normal')
  expect(getByText(/Medium/)).toHaveClass('medium')
  expect(getByText(/Bold/)).toHaveClass('bold')
})

test('should accept a custom class name', () => {
  const { getByText } = render(
    <Text className="custom-classname">Custom class name</Text>
  )
  expect(getByText(/Custom class name/)).toHaveClass('custom-classname')
})
