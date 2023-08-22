import { MarsImage } from '@/interfaces/Interfaces'

export interface DataProps {
  maxSol: number
  maxDate: string
  landingDate: string
  totalPages: number
  totalImages: number
  page: number
  images: MarsImage[]
}

export const getMarsData = async ({
  rover = 'curiosity',
  page = 1,
  sol,
  camera,
  startDate,
}: {
  sol?: number
  camera?: string
  page?: number
  rover?: string
  startDate?: Date
}): Promise<DataProps> => {
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${process.env.API_KEY}`
  const manifests = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.API_KEY}`

  const manifest = await fetch(manifests)
  const manifestData = await manifest.json()

  const maxSol = manifestData.photo_manifest?.max_sol
  const maxDate = manifestData.photo_manifest?.max_date
  const landingDate = manifestData.photo_manifest?.landing_date

  if (sol && sol !== undefined) {
    url += `&sol=${sol}`
  } else if (startDate) {
    const today = startDate
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate() - 2).padStart(2, '0')
    console.log('🚀 ~ file: getMarsData.tsx:43 ~ day:', day)

    url += `&earth_date=${year}-${month}-${day}`
  }

  if (camera) {
    url += `&camera=${camera}`
  }

  const res = await fetch(url)
  const initialData = await res.json()

  const totalImages = initialData.photos?.length
  const imagesPerPage = 25
  const totalPages = Math.ceil(totalImages / imagesPerPage)

  if (page) {
    url += `&page=${page}`
  }

  const dataResponse = await fetch(url)
  const data = await dataResponse.json()

  const images = data.photos

  return {
    maxDate,
    landingDate,
    maxSol,
    totalPages,
    totalImages,
    page,
    images,
  }
}
