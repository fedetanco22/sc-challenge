import React, { FC, memo } from 'react'

import Spinner from '../Spinner/Spinner'

import styles from './RoverList.module.scss'

import RoverCard from '@/components/RoverCard/RoverCard'
import { useAppDataContext } from '@/context/useAppContext'

const RoverList: FC = () => {
  const { marsData, loading } = useAppDataContext()

  const renderRovers = (): JSX.Element[] => {
    return marsData.map(rover => <RoverCard key={rover.id} rover={rover} />)
  }

  if (loading)
    return (
      <div className={`${styles.roverList} flex flex__center `}>
        <Spinner />
      </div>
    )

  if (!marsData.length)
    return (
      <div className={`${styles.roverList} flex flex__center `}>
        <h2>No results found</h2>
      </div>
    )

  return <div className={`${styles.roverList} flex `}>{renderRovers()}</div>
}

export default memo(RoverList)
