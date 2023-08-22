import React, { useEffect } from 'react'

import SelectInput from '../SelectInput/SelectInput'

import {
  useAppStateContext,
  useSetFilteredDataContext,
} from '@/context/useAppContext'

interface RoverCameraOptions {
  [rover: string]: { value: string; label: string }[]
}

const roverCameraOptions: RoverCameraOptions = {
  curiosity: [
    { value: '', label: 'ALL CAMERAS' },
    { value: 'FHAZ', label: 'FHAZ' },
    { value: 'RHAZ', label: 'RHAZ' },
    { value: 'MAST', label: 'MAST' },
    { value: 'CHEMCAM', label: 'CHEMCAM' },
    { value: 'MAHLI', label: 'MAHLI' },
    { value: 'MARDI', label: 'MARDI' },
    { value: 'NAVCAM', label: 'NAVCAM' },
  ],
  opportunity: [
    { value: '', label: 'ALL CAMERAS' },
    { value: 'FHAZ', label: 'FHAZ' },
    { value: 'RHAZ', label: 'RHAZ' },
    { value: 'NAVCAM', label: 'NAVCAM' },
    { value: 'PANCAM', label: 'PANCAM' },
    {
      value: 'MINITES',
      label: 'MINITES',
    },
  ],
  spirit: [
    { value: '', label: 'ALL CAMERAS' },
    { value: 'FHAZ', label: 'FHAZ' },
    { value: 'RHAZ', label: 'RHAZ' },
    { value: 'NAVCAM', label: 'NAVCAM' },
    { value: 'PANCAM', label: 'PANCAM' },
    {
      value: 'MINITES',
      label: 'MINITES',
    },
  ],
}

const CameraSelect = (): JSX.Element => {
  const { filterByRover, filterByCamera } = useAppStateContext()
  const { setFilterByCamera } = useSetFilteredDataContext()
  const cameraOptions = roverCameraOptions[filterByRover || '']

  const handleCameraSelected = (camera: React.SetStateAction<string>): void => {
    setFilterByCamera(camera as string)
  }

  return (
    <SelectInput
      options={cameraOptions}
      title="Select a Camera"
      filterValue={filterByCamera}
      setFilter={handleCameraSelected}
      nullOptionLabel="Select a Camera"
    />
  )
}

export default CameraSelect
