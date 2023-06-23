import React from 'react'

function NoDataFound({ data }) {
  return <>{data.length === 0 && <p>No images found</p>}</>
}

export default NoDataFound
