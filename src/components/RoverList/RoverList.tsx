import React, { FC, memo } from 'react'

import styles from './RoverList.module.css'

import { MarsImage } from '@/interfaces/Interfaces'
import RoverCard from '@/components/RoverCard/RoverCard'

interface RoverListProps {
  data: MarsImage[] // Use the MarsImage type here
}

const RoverList: FC<RoverListProps> = ({ data }) => {
  const renderRovers = (): JSX.Element[] => {
    return data.map(rover => {
      return <RoverCard key={rover.id} rover={rover} />
    })
  }

  return <div className={styles.roverList}>{renderRovers()}</div>
}

export default memo(RoverList)
