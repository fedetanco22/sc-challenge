import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import useAppContext from '../../utils/context/useAppContext'

const SearchBookmarks = ({ searchParams }) => {
  const { addToFavorites } = useAppContext()
  const [bookmarkName, setBookmarkName] = useState('')

  const handleBookmarkNameChange = event => {
    setBookmarkName(event.target.value)
  }

  const handleSaveBookmark = () => {
    if (bookmarkName && searchParams) {
      addToFavorites({ name: bookmarkName, id: uuidv4(), searchParams })
      setBookmarkName('')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={bookmarkName}
        onChange={handleBookmarkNameChange}
        placeholder="Search Name"
      />
      <button onClick={handleSaveBookmark}>Save Search</button>
    </div>
  )
}

export default SearchBookmarks
