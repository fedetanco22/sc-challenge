import React, { FC } from 'react'

import { MarsImage } from '@/src/interfaces/Interfaces'

interface NoDataProps {
  data: MarsImage[]
}

const NoDataFound: FC<NoDataProps> = ({ data }) => {
  return <>{data.length === 0 && <p>No images found</p>}</>
}

export default NoDataFound
