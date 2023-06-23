import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../components/layout/Layout'
import RoverList from '../components/rover-list/RoverList'

function Home({ data }) {
  const router = useRouter()

  useEffect(() => {
    router.push('/rovers/curiosity')
  }, [router])

  return <div></div>
}

export default Home
