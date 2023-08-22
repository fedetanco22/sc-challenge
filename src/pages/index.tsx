import React, { Suspense } from 'react'

import PrincipalContent from '@/components/PrincipalContent/PrincipalContent'
import Spinner from '@/components/Spinner/Spinner'
import Layout from '@/components/Layout/Layout'
import { PoppinsFont } from '@/utils/fonts'
import Filters from '@/components/Filters/Filters'

const LazyRoverList = React.lazy(
  () => import('@/src/components/RoverList/RoverList')
)

export default function Home(): JSX.Element {
  return (
    <>
      <div className={`${PoppinsFont.className}`}>
        <Layout
          title="NASA Challenge"
          description="Generated magic by Federico Tanco"
          keywords="NASA, Rover, Curiosity, Opportunity, Spirit, Mars, Federico Tanco"
        >
          <PrincipalContent />
          <Filters />
          <Suspense fallback={<Spinner />}>
            <LazyRoverList />
          </Suspense>
        </Layout>
      </div>
    </>
  )
}
