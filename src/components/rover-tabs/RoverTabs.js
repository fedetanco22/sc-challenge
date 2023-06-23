import Link from 'next/link'
import { useRouter } from 'next/router'

const links = [
  { label: 'Curiosity', rover: 'curiosity' },
  { label: 'Opportunity', rover: 'opportunity' },
  { label: 'Spirit', rover: 'spirit' },
]
export default function RoverTabs() {
  const router = useRouter()

  return (
    <div className="MainContent">
      <h1>Mars Rover Photos</h1>
      <p>
        Image data gathered by NASA`s Curiosity, Opportunity, and Spirit rovers
        on Mars
      </p>
      <p>Select the rover you want to see photos of</p>

      <div className="RoverTabs">
        {links.map(({ label, rover }) => (
          <Link
            key={rover}
            href={`/rovers/${rover}`}
            className={`RoverTabs__tab ${
              router.query.rover === rover ? 'active' : ''
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
