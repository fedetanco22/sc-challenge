import { useState, useEffect } from 'react'
import Select from 'react-select'

const roverCameraOptions = {
  curiosity: [
    { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
    { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
    { value: 'MAST', label: 'Mast Camera' },
    { value: 'CHEMCAM', label: 'Chemistry and Camera Complex' },
    { value: 'MAHLI', label: 'Mars Hand Lens Imager' },
    { value: 'MARDI', label: 'Mars Descent Imager' },
    { value: 'NAVCAM', label: 'Navigation Camera' },
  ],
  opportunity: [
    { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
    { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
    { value: 'NAVCAM', label: 'Navigation Camera' },
    { value: 'PANCAM', label: 'Panoramic Camera' },
    {
      value: 'MINITES',
      label: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
    },
  ],
  spirit: [
    { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
    { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
    { value: 'NAVCAM', label: 'Navigation Camera' },
    { value: 'PANCAM', label: 'Panoramic Camera' },
    {
      value: 'MINITES',
      label: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
    },
  ],
}

function SelectCamera({ handleCameraSelected, rover }) {
  const [selectedCamera, setSelectedCamera] = useState(null)
  const options = roverCameraOptions[rover] || []

  useEffect(() => {
    setSelectedCamera(null)
  }, [rover])

  const handleCamera = selectedOption => {
    setSelectedCamera(selectedOption)
    handleCameraSelected(selectedOption ? selectedOption.value : null)
  }

  return (
    <Select
      options={options}
      value={selectedCamera}
      onChange={handleCamera}
      isClearable={true}
    />
  )
}

export default SelectCamera
