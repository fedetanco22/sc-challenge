import React from 'react'
import { Pagination, PaginationItem, Stack } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import {
  useAppStateContext,
  useSetFilteredDataContext,
} from '@/context/useAppContext'

const RoverPagination = (): JSX.Element => {
  const { totalPages, filterByPage } = useAppStateContext()
  const { setFilterByPage } = useSetFilteredDataContext()

  const handlePagination = (
    _: unknown,
    value: React.SetStateAction<number>
  ): void => {
    setFilterByPage(value)
  }

  return (
    <div>
      <Stack spacing={2} className="global__pagination">
        <Pagination
          count={totalPages}
          variant="outlined"
          color="primary"
          page={filterByPage}
          onChange={handlePagination}
          renderItem={item => (
            <PaginationItem
              slots={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  )
}

export default RoverPagination
