import React, { useState, useEffect, FC } from 'react'
import { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import { parseISO } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useDebounce } from 'use-debounce'
import { GetServerSideProps } from 'next'

import SelectCamera from '@/components/select-camera/SelectCamera'
import SolDateInput from '@/components/sol-date-input/SolDateInput'
import RoverList from '@/components/RoverList/RoverList'
import Spinner from '@/components/Spinner/Spinner'
import NoDataFound from '@/components/NoDataFound/NoDataFound'
import { getMarsData } from '@/server/api/getMarsData'
import { MarsImage } from '@/interfaces/Interfaces'
import Filters from '@/components/Filters/Filters'

interface RoverPageProps {
  initialData: MarsImage[]
}

const RoverPage: FC<RoverPageProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined)
  const [startDate, setStartDate] = useState(new Date())
  const [sol, setSol] = useState<number | null>(null)
  const [maxSol, setMaxSol] = useState<number | undefined>(undefined)
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined)
  const [minDate, setMinDate] = useState<Date | undefined>(undefined)
  const [camera, setCamera] = useState('')
  const [onLoading, setOnLoading] = useState(false)

  const [debouncedValue] = useDebounce(sol, 1000)

  const router = useRouter()
  const { rover } = router.query

  useEffect(() => {
    setOnLoading(true)
    getMarsData({
      rover: rover as string,
      page: page,
      startDate: startDate,
      sol: debouncedValue as number,
      camera: camera,
    })
      .then(res => {
        setData(res.images)
        setTotalPages(res.totalPages)
        setMaxDate(parseISO(res.maxDate))
        setMinDate(parseISO(res.landingDate))
        setMaxSol(res.maxSol)
        setOnLoading(false)
      })
      .catch(error => {
        console.error(error)
        setOnLoading(false)
      })
  }, [rover, startDate, debouncedValue, page, camera])

  useEffect(() => {
    setPage(1)
  }, [rover, startDate])

  useEffect(() => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    setStartDate(yesterday)
  }, [rover])

  const handlePagination = (
    _: unknown,
    value: React.SetStateAction<number>
  ): void => {
    setPage(value)
  }

  const handleCameraSelected = (camera: React.SetStateAction<string>): void => {
    setCamera(camera)
  }

  const handleSolDate = (sol: React.SetStateAction<number | null>): void => {
    setSol(sol)
  }

  return (
    <div className="Rover__container">
      <div className="Rover__search-params-container">
        <div className="Rover__search-params-container__params">
          <p>Earth Date:</p>
          <DatePicker
            showIcon
            selected={startDate}
            onChange={date => {
              date && setStartDate(date)
            }}
            maxDate={maxDate}
            minDate={minDate}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
          />
        </div>
        <div className="Rover__search-params-container__params">
          <p>Martian Sol Date: </p>
          <SolDateInput
            maxSol={maxSol || ''}
            handleSolDate={handleSolDate}
            sol={sol}
          />
        </div>
        <div className="Rover__search-params-container__params">
          <Filters
            // handleCameraSelected={handleCameraSelected}
            rover={'curiosity'}
          />
        </div>
      </div>

      {onLoading ? (
        <Spinner />
      ) : (
        <>
          {data.length === 0 && <NoDataFound data={[]} />}

          {data.length !== 0 && (
            <>
              <RoverList data={data} />

              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  variant="outlined"
                  color="primary"
                  page={1}
                  onChange={handlePagination}
                  renderItem={item => (
                    <PaginationItem
                      // color="secondary"
                      slots={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                    />
                  )}
                />
              </Stack>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default RoverPage

export const getServerSideProps: GetServerSideProps = async context => {
  const rover = context.query.rover as string // Get the rover query parameter from the context
  const page = 1 // Set the initial page number or obtain it as needed

  try {
    const res = await getMarsData({
      rover: rover,
      page: page,
      startDate: new Date(), // Set your start date logic here
      sol: undefined, // Set your sol value logic here
      camera: '', // Set your camera value logic here
    })

    return {
      props: {
        initialData: res.images, // Provide the fetched images data
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        initialData: [], // Provide an empty array or a default value
      },
    }
  }
}
