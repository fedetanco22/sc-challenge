export async function getData({ sol, camera, page = 1, rover, startDate }) {
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${process.env.NASA_API_KEY}`
  let manifests = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.NASA_API_KEY}`
  let manifest = await fetch(manifests)
  let manifestData = await manifest.json()
  let maxSol = manifestData.photo_manifest?.max_sol
  let maxDate = manifestData.photo_manifest?.max_date
  let landingDate = manifestData.photo_manifest?.landing_date

  if (sol && sol !== undefined) {
    url += `&sol=${sol}`
  } else if (startDate) {
    const today = startDate
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')

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
  return {
    maxDate,
    landingDate,
    maxSol,
    totalPages,
    totalImages,
    page,
    data,
  }
}
