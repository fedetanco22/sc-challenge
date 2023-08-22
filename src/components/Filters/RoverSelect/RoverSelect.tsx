import React from 'react'

import SelectInput from '../SelectInput/SelectInput'

import {
  useAppStateContext,
  useSetFilteredDataContext,
} from '@/context/useAppContext'

const roverOptions = [
  { value: 'curiosity', label: 'Curiosity' },
  { value: 'opportunity', label: 'Opportunity' },
  { value: 'spirit', label: 'Spirit' },
]
const CameraSelect = (): JSX.Element => {
  const { filterByRover } = useAppStateContext()
  const { setFilterByRover } = useSetFilteredDataContext()

  const handleRoverSelected = (rover: React.SetStateAction<string>): void => {
    setFilterByRover(rover)
  }

  return (
    <SelectInput
      options={roverOptions}
      title="Select a Rover"
      filterValue={filterByRover}
      setFilter={handleRoverSelected}
      nullOptionLabel="Select a Camera"
    />
  )
}

export default CameraSelect
