import { useState } from "react";
import BookmarkList from "../../components/BookmarkList/BookmarkList";

function BookmarksPage(){
    var str_bookmarks = localStorage['bookmarks'] || '';
    var arrBookmarks = []
    if(str_bookmarks !== ''){
        arrBookmarks = str_bookmarks.split(',')
    }

    const [bookmarks, setBookmark] = useState(arrBookmarks)

    const removeBtnHandler = (code) => {
        arrBookmarks = arrBookmarks.filter(c => c !== code)
        localStorage.setItem("bookmarks", arrBookmarks.toString());
        setBookmark(arrBookmarks)
    }

    return (
        <div>
            <h1 className="d-flex justify-content-center text-dark m-3">Country Bookmarks</h1>
            <h4 className="d-flex justify-content-center text-primary m-3 text-center">A collection of your bookmarked asian countries</h4>
            {bookmarks.length === 1 ? <h5 className="d-flex justify-content-center text-dark m-3 text-center">You currently have {bookmarks.length} country bookmarked</h5> : <h5 className="d-flex justify-content-center text-dark m-3 text-center">You currently have {bookmarks.length} countries bookmarked</h5>}
            {bookmarks.length === 0 ? <h5 className="d-flex justify-content-center text-dark mt-5 m-3 text-center font-italic">Your bookmarked countries will show up here</h5> : <BookmarkList code={bookmarks} removeBtnHandler={removeBtnHandler}/>}
        </div>
    )
}

export default BookmarksPage