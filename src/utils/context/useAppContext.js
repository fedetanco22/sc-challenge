import { createContext, useContext, useState } from 'react'

import { useStorage } from '../hooks/useStorage'

const AppContext = createContext()
const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useStorage('roverFavorites', [])
  const [startDate, setStartDate] = useState(new Date())

  const [sol, setSol] = useState()
  const [camera, setCamera] = useState('')

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
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        restoreSearchParams,
        startDate,
        setStartDate,
        sol,
        setSol,
        camera,
        setCamera,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default useAppContext
