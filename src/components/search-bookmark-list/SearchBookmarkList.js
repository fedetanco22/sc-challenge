import useAppContext from '../../utils/context/useAppContext'

function SearchBookmarkList({}) {
  const { favorites } = useAppContext()

  //   const handleRemoveBookmark = bookmark => {
  //     removeFromFavorites(bookmark.id)
  //   }

  //   const handleRestoreBookmark = bookmark => {
  //     console.log(
  //       '🚀 ~ file: SearchBookmarkList.js:15 ~ handleRestoreBookmark ~ bookmark:',
  //       bookmark.searchParams
  //     )
  //     restoreSearchParams(bookmark.searchParams)
  //   }

  return (
    <>
      <h2>Bookmarks</h2>
      <>
        {favorites.map(bookmark => (
          <div key={bookmark.id}>
            {bookmark.name}
            <button onClick={() => handleRestoreBookmark(bookmark)}>
              Restore
            </button>
            <button onClick={() => handleRemoveBookmark(bookmark)}>
              Remove
            </button>
          </div>
        ))}
      </>
    </>
  )
}

export default SearchBookmarkList
