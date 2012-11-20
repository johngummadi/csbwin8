var gBooks = new Books();

function Books() {
    this.mBooks = null;

    this.load = function (loadedBooksEvent, errorEvent) {
        var httpReq = new XMLHttpRequest();
        var url = "http://cloudstudybible.com/php/getbooksjson.php";
        httpReq.open("GET", url, true);
        httpReq.onreadystatechange = (function stateChanged() {
            if (this.readyState == 4 && httpReq.responseText!=null && httpReq.responseText.length > 0) {
                var booksContainer = JSON.parse(httpReq.responseText);
                gBooks.mBooks = booksContainer.Books;
                if (loadedBooksEvent != null)
                    loadedBooksEvent(gBooks.mBooks);
            }
        });
        httpReq.send(null);
    } //load()
    
    this.getBooks = function () {
        return this.mBooks;
    } //getBooks()
} //Books

function Chapter() {
    
    this.load = function (bookId, chapterNumber, loadedChapterEvent, errorEvent) {
        var httpReq = new XMLHttpRequest();
        var url = "http://cloudstudybible.com/php/getchapterjson.php?b=" + bookId + "&c=" + chapterNumber + "";
        httpReq.open("GET", url, true);
        httpReq.onreadystatechange = (function stateChanged() {
            if (this.readyState == 4) {
                var chapter = JSON.parse(httpReq.responseText);
                if (loadedChapterEvent != null)
                    loadedChapterEvent(chapter);
            }
        });
        httpReq.send(null);
    } //load()
}