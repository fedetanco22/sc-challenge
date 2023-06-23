import { createContext, useContext, useEffect, useState } from 'react'

import { useStorage } from '../hooks/useStorage'

const AppContext = createContext()
const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  // const [local] = useState(() => {
  //   if (typeof window !== 'undefined') {
  //     const from_localStorage = window.localStorage.getItem('favorites')
  //     if (from_localStorage === null || from_localStorage === undefined) {
  //       return []
  //     }

  //     return from_localStorage ? from_localStorage : []
  //   }
  //   return []
  // })

  // const [favorites, setFavorites] = useState(local)
  const [startDate, setStartDate] = useState(new Date())
  const [sol, setSol] = useState()
  const [camera, setCamera] = useState('')

  // useEffect(() => {
  //   window.localStorage.setItem('favorites', JSON.stringify(favorites))
  // }, [favorites, local])

  const addToFavorites = bookmark => {
    setFavorites(prevFavorites => [...prevFavorites, bookmark])
  }

  const removeFromFavorites = bookmarkId => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(favorite => favorite.id !== bookmarkId)
    )
  }

  const restoreSearchParams = searchParams => {
    const { startDate, sol, camera } = searchParams

    // setStartDate(startDate)
    // setSol(sol)
    // setCamera(camera)
  }

  return (
    <AppContext.Provider
      value={
        {
          // favorites,
          // addToFavorites,
          // removeFromFavorites,
          // restoreSearchParams,
          // startDate,
          // setStartDate,
          // sol,
          // setSol,
          // camera,
          // setCamera,
        }
      }
    >
      {children}
    </AppContext.Provider>
  )
}

export default useAppContext
