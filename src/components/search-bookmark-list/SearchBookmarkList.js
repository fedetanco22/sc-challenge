import useAppContext from '../../utils/context/useAppContext'

function SearchBookmarkList({}) {
  const {
    favorites = [],
    removeFromFavorites,
    restoreSearchParams,
  } = useAppContext()

  const handleRemoveBookmark = bookmark => {
    removeFromFavorites(bookmark.id)
  }

  const handleRestoreBookmark = bookmark => {
    console.log(
      '🚀 ~ file: SearchBookmarkList.js:15 ~ handleRestoreBookmark ~ bookmark:',
      bookmark.searchParams
    )
    restoreSearchParams(bookmark.searchParams)
  }

  return (
    <div>
      <h2>Bookmarks</h2>
      <ul>
        {favorites.map(bookmark => (
          <li key={bookmark.id}>
            {bookmark.name}
            <button onClick={() => handleRestoreBookmark(bookmark)}>
              Restore
            </button>
            <button onClick={() => handleRemoveBookmark(bookmark)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBookmarkList
