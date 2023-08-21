import React from 'react'
import GridLoader from 'react-spinners/GridLoader'

const Spinner = ({ onLoading }: { onLoading?: boolean }): JSX.Element => {
  return <GridLoader color="#1e5dff" loading={onLoading} />
}

export default Spinner
