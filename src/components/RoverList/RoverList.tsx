import React, { FC, memo } from 'react'

import Spinner from '../Spinner/Spinner'

import styles from './RoverList.module.css'

import RoverCard from '@/components/RoverCard/RoverCard'
import { useAppDataContext } from '@/context/useAppContext'

const RoverList: FC = () => {
  const { marsData, loading } = useAppDataContext()

  // Ensure marsData is an array before mapping over it
  const renderRovers = (): JSX.Element[] => {
    return marsData.map(rover => <RoverCard key={rover.id} rover={rover} />)
  }

  if (loading) return <Spinner />

  return (
    <div className={styles.roverList}>
      {renderRovers()} {/* Notice that it's an array of elements */}
    </div>
  )
}

export default memo(RoverList)
