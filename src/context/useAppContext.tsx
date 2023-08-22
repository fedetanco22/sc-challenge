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

interface AppStateContextInterface {
  marsData: DataProps
  setMarsData: React.Dispatch<React.SetStateAction<DataProps>>
}

interface FilteredContextInterface {
  setFilterByRover: React.Dispatch<React.SetStateAction<string>>
  setFilterByPage: React.Dispatch<React.SetStateAction<number>>
  setFilterBySol: React.Dispatch<React.SetStateAction<number | undefined>>
  setFilterByCamera: React.Dispatch<React.SetStateAction<string | undefined>>
}

export interface AppWrapperChildrenInterface {
  children: React.ReactNode
}

const AppContext = createContext<AppStateContextInterface | null>(null)
const FilteredDataContext = createContext<FilteredContextInterface | null>(null)

export const useAppStateContext = (): AppStateContextInterface => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error(
      'useAppContextState must be used within an AppWrapperProvider'
    )
  }

  return context
}
export const useSetFilteredDataContext = (): FilteredContextInterface => {
  const context = useContext(FilteredDataContext)

  if (!context) {
    throw new Error(
      'useSetFilteredDataContext must be used within an AppWrapperProvider'
    )
  }

  return context
}

export const AppContextProvider: FC<AppWrapperChildrenInterface> = ({
  children,
}) => {
  const [filterByRover, setFilterByRover] = useState<string>('curiosity')
  const [filterByPage, setFilterByPage] = useState<number>(1)
  const [filterBySol, setFilterBySol] = useState<number | undefined>(undefined)
  const [filterByCamera, setFilterByCamera] = useState<string>()
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
        rover: filterByRover,
        page: filterByPage,
        startDate: startDate,
        sol: filterBySol,
        camera: filterByCamera,
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
  }, [filterByRover, filterByPage, filterBySol, filterByCamera])

  const filteredDataContextValue = useMemo<FilteredContextInterface>(() => {
    return {
      setFilterByRover,
      setFilterByPage,
      setFilterBySol,
      setFilterByCamera,
    }
  }, [setFilterByRover, setFilterByPage, setFilterBySol, setFilterByCamera])

  const contextValue = useMemo<AppStateContextInterface>(
    () => ({ marsData, setMarsData }),
    [marsData]
  )

  return (
    <FilteredDataContext.Provider value={filteredDataContextValue}>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </FilteredDataContext.Provider>
  )
}
