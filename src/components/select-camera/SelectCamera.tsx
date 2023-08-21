import React, { useState, useEffect } from 'react'
import Select from 'react-select'

const roverCameraOptions = {
  curiosity: [
    { value: 'FHAZ', label: 'FHAZ' },
    { value: 'RHAZ', label: 'RHAZ' },
    { value: 'MAST', label: 'MAST' },
    { value: 'CHEMCAM', label: 'CHEMCAM' },
    { value: 'MAHLI', label: 'MAHLI' },
    { value: 'MARDI', label: 'MARDI' },
    { value: 'NAVCAM', label: 'NAVCAM' },
  ],
  opportunity: [
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

function SelectCamera({
  handleCameraSelected,
  rover,
}: {
  handleCameraSelected: (camera: string) => void
  rover: string
}): JSX.Element {
  const [selectedCamera, setSelectedCamera] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const options = roverCameraOptions[rover] || []

  useEffect(() => {
    setSelectedCamera(null)
    setIsMounted(true)
  }, [rover])

  const handleCamera = selectedOption => {
    setSelectedCamera(selectedOption)
    handleCameraSelected(selectedOption ? selectedOption.value : null)
  }

  return (
    <>
      {isMounted ? (
        <Select
          options={options}
          value={selectedCamera}
          onChange={handleCamera}
          isClearable={true}
        />
      ) : null}
    </>
  )
}

export default SelectCamera
