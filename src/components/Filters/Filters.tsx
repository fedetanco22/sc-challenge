import React from 'react'

import CameraSelect from './CameraSelect/CameraSelect'
import RoverSelect from './RoverSelect/RoverSelect'
import styles from './Filters.module.scss'

const Filters = (): JSX.Element => {
  return (
    <div className={`${styles.filters__container} flex flex__column`}>
      <RoverSelect />
      <CameraSelect />
    </div>
  )
}

export default Filters
