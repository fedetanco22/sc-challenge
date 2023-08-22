import React, { useState } from 'react'

import SelectInput from '../SelectInput/SelectInput'

const roverList = [
  { label: 'Curiosity', value: 'curiosity' },
  { label: 'Opportunity', value: 'opportunity' },
  { label: 'Spirit', value: 'spirit' },
]

const Filters = (): JSX.Element => {
  const [rover, setRover] = useState('curiosity')

  return <SelectInput options={roverList} title="Select a Rover" />
}

export default Filters
