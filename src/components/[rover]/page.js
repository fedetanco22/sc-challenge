'use client'

import { useState, useEffect } from 'react'

import RoverList from '../rover-list/RoverList'
import CustomPagination from '../custom-pagination/CustomPagination'

import getRoverResults from '@/src/utils/getRoverResults'

export default function RoverCameras({ params }) {
  const [data, setData] = useState([])
  const [sol, setSol] = useState(1)
  const [camera, setCamera] = useState('')
  const [page, setPage] = useState(1)
  const { rover } = params

  useEffect(() => {
    const fetchData = async () => {
      const parameters = {
        rover: rover,
        sol: sol,
        camera: camera,
        page: page,
      }
      const fetchedData = await getRoverResults(parameters)

      setData(fetchedData.images)
    }

    fetchData()
  }, [camera, page, rover, sol])

  const handlePagination = (event, value) => {
    setPage(value)
  }

  return (
    <>
      {data && data.length !== 0 ? (
        <>
          <CustomPagination
            page={page}
            totalPages={data.totalPages}
            handlePagination={handlePagination}
          />
          <RoverList data={data} />
        </>
      ) : (
        <p>No images found</p>
      )}
    </>
  )
}
