import { useState, CSSProperties } from 'react'
import GridLoader from 'react-spinners/GridLoader'

function Spinner({ onLoading }) {
  return <GridLoader color="#1e5dff" loading={onLoading} />
}

export default Spinner
