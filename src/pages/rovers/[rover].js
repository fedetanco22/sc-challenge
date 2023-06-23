import { useState, useEffect, useMemo } from 'react'
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

import SelectCamera from '../../components/select-camera/SelectCamera'
import SolDateInput from '../../components/sol-date-input/SolDateInput'
import RoverList from '../../components/rover-list/RoverList'
import Spinner from '../../components/spinner/Spinner'
import SearchBookmarks from '../../components/search-bookmarks/SearchBookmarks'
import SearchBookmarkList from '../../components/search-bookmark-list/SearchBookmarkList'
import useAppContext from '../../utils/context/useAppContext'

import { getData } from '@/src/utils/getData'

export default function RoverPage() {
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState()
  const [page, setPage] = useState(1)
  const [startDate, setStartDate] = useState(new Date())
  const [sol, setSol] = useState()
  const [camera, setCamera] = useState('')
  const [maxDate, setMaxDate] = useState()
  const [minDate, setMinDate] = useState()
  const [maxSol, setMaxSol] = useState()
  const [onLoading, setOnLoading] = useState(false)

  const [debouncedValue] = useDebounce(sol, 1000)

  const router = useRouter()
  const { rover } = router.query

  useEffect(() => {
    setOnLoading(true)
    try {
      getData({
        rover: rover,
        page: page,
        startDate: startDate,
        sol: debouncedValue,
        camera: camera,
      }).then(res => {
        setData(res.data)
        setTotalPages(res.totalPages)
        setMaxDate(parseISO(res.maxDate))
        setMinDate(parseISO(res.landingDate))
        setMaxSol(res.maxSol)
        setOnLoading(false)
      })
    } catch (error) {
      new Error(error)
      // setOnLoading(false)
    }
  }, [rover, startDate, debouncedValue, page, camera])

  useEffect(() => {
    setPage(1)
  }, [rover, startDate])

  useEffect(() => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    setStartDate(yesterday)
  }, [rover])

  const handlePagination = (_, value) => {
    setPage(value)
  }

  const handleCameraSelected = camera => {
    setCamera(camera)
  }

  const handleSolDate = sol => {
    setSol(sol)
  }

  return (
    <div className="Rover__container">
      <div className="Rover__search-params-container">
        <div className="Rover__search-params-container__date-picker">
          <p>Earth Date:</p>
          <DatePicker
            showIcon
            selected={startDate}
            onChange={date => {
              setStartDate(date)
            }}
            maxDate={maxDate}
            minDate={minDate}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
          />
        </div>
        <div className="Rover__search-params-container__date-picker">
          <p>Martian Sol Date: </p>
          <SolDateInput
            maxSol={maxSol}
            handleSolDate={handleSolDate}
            sol={sol}
          />
        </div>
        <SelectCamera
          handleCameraSelected={handleCameraSelected}
          rover={rover}
        />
      </div>

      {/* <SearchBookmarks searchParams={{ rover, startDate, sol, camera }} />
      <SearchBookmarkList /> */}
      {data && data?.photos?.length !== 0 ? (
        <>
          {onLoading ? (
            <Spinner onLoading={onLoading} />
          ) : (
            <RoverList data={data.photos || []} />
          )}
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              variant="outlined"
              color="primary"
              page={page}
              onChange={handlePagination}
              renderItem={item => (
                <PaginationItem
                  color="secondary"
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </>
      ) : (
        <p>No images found</p>
      )}
    </div>
  )
}
