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
import { MarsImage } from '../interfaces/Interfaces'

import { DataProps } from '@/server/api/getMarsData'

interface AppDataContextInterface {
  marsData: MarsImage[]
  loading: boolean
}

interface AppStateContextInterface {
  filterByRover?: string
  filterByPage?: number
  filterBySol?: number | undefined
  filterByCamera?: string | undefined
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

const AppStateContext = createContext<AppStateContextInterface | null>(null)
const FilteredDataContext = createContext<FilteredContextInterface | null>(null)
const AppDataContext = createContext<AppDataContextInterface | null>(null)

export const useAppStateContext = (): AppStateContextInterface => {
  const context = useContext(AppStateContext)

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
export const useAppDataContext = (): AppDataContextInterface => {
  const context = useContext(AppDataContext)

  if (!context) {
    throw new Error(
      'useAppDataContext must be used within an AppWrapperProvider'
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

  const [marsData, setMarsData] = useState<MarsImage[]>([])

  const fetchMarsData = async (): Promise<void> => {
    setLoading(true)
    try {
      await getMarsData({
        rover: filterByRover,
        page: filterByPage,
        sol: filterBySol,
        camera: filterByCamera,
        startDate: startDate,
      }).then(res => {
        setMarsData(res.images)
        setLoading(false)
      })
    } catch (error) {
      throw new Error(error as string)
    }
  }

  useEffect(() => {
    fetchMarsData()
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [filterByRover, filterByPage, filterBySol, filterByCamera, startDate])

  const debouncedFetchData = debounce(fetchMarsData, 100)

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

  const appDataContext = useMemo<AppDataContextInterface>(
    () => ({ marsData, loading, startDate }),
    [marsData, loading, startDate]
  )

  return (
    <FilteredDataContext.Provider value={filteredDataContextValue}>
      <AppStateContext.Provider
        value={{
          filterByRover,
          filterByPage,
          filterBySol,
          filterByCamera,
        }}
      >
        <AppDataContext.Provider value={appDataContext}>
          {children}
        </AppDataContext.Provider>
      </AppStateContext.Provider>
    </FilteredDataContext.Provider>
  )
}
