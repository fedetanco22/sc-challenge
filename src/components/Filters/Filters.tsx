import React, { useState } from 'react'

import SelectInput from './SelectInput/SelectInput'
import styles from './Filters.module.scss'

const roverList = [
  { label: 'Curiosity', value: 'curiosity' },
  { label: 'Opportunity', value: 'opportunity' },
  { label: 'Spirit', value: 'spirit' },
]

interface RoverCameraOptions {
  [rover: string]: { value: string; label: string }[]
}

const roverCameraOptions: RoverCameraOptions = {
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

const Filters = ({ rover }: { rover: string }): JSX.Element => {
  const cameraOptions = roverCameraOptions[rover] || []
  return (
    <div className={`${styles.filters__container} flex flex__column`}>
      <SelectInput options={roverList} title="Select a Rover" />
      <SelectInput options={cameraOptions} title="Select a Camera" />
      <SelectInput options={roverList} title="Select a Earth Date" />
    </div>
  )
}

export default Filters
