import React, {
  createContext,
  useContext,
  FC,
  useState,
  useMemo,
  useEffect,
} from 'react'
import debounce from 'lodash/debounce'

import { getMarsData } from '../server/api/getMarsData'

import { DataProps } from '@/server/api/getMarsData'

interface AppContextInterface {
  marsData: DataProps
  setMarsData: React.Dispatch<React.SetStateAction<DataProps>>
}

interface FilteredContextInterface {
  setPriceRange: React.Dispatch<React.SetStateAction<number>>
  setFilterByOrder: React.Dispatch<React.SetStateAction<string>>
  setFilterByLikes?: React.Dispatch<React.SetStateAction<string>>
  setFilterByColors?: React.Dispatch<React.SetStateAction<string>>
}

export interface AppWrapperChildrenInterface {
  children: React.ReactNode
}

const AppContext = createContext<AppContextInterface | null>(null)
const FilteredDataContext = createContext<FilteredContextInterface | null>(null)

export const useAppContext = (): AppContextInterface => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error(
      'useAppContextState must be used within an AppWrapperProvider'
    )
  }

  return context
}

export const AppContextProvider: FC<AppWrapperChildrenInterface> = ({
  children,
}) => {
  const [rover, setRover] = useState<string>('curiosity')
  const [page, setPage] = useState<number>(1)
  const [sol, setSol] = useState<number | undefined>(undefined)
  const [camera, setCamera] = useState<string>()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState<boolean>(true)

  const [marsData, setMarsData] = useState<DataProps>({
    maxSol: 0,
    maxDate: '',
    landingDate: '',
    totalPages: 0,
    totalImages: 0,
    page: 1,
    images: [],
  })

  const fetchMarsData = async (): Promise<void> => {
    try {
      const initialData = await getMarsData({
        rover: rover,
        page: page,
        startDate: startDate,
        sol: sol,
        camera: camera,
      })
      setMarsData(initialData)
    } catch (error) {
      throw new Error(error as string)
    }
  }

  useEffect(() => {
    fetchMarsData()
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [])

  const debouncedFetchData = debounce(fetchMarsData, 300)

  useEffect(() => {
    debouncedFetchData()
  }, [rover, page, sol, camera, startDate])

  const contextValue = useMemo<AppContextInterface>(
    () => ({ marsData, setMarsData }),
    [marsData]
  )

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
