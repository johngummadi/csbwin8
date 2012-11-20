// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
            gBooks.load(renderBooks, null);
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    function renderBooks(books) {
        while (BooksDiv.hasChildNodes()) {
            BooksDiv.removeChild(BooksDiv.lastChild);
        }
        var template = BooksTemplate.winControl;
        var bFirst = true;
        books.forEach(function (item) {
            template.render(item).then(
            function (element) {
                element.setAttribute("onclick", "javascript:onBookSelected(" + item.BookID + ");");
                
                //element.setAttribute("bookitem", item);
                //element.setAttribute("bookitem", item);
                if (bFirst) {
                    bFirst = false;
                    element.style.marginTop = "0px";
                }
                element.style.marginBottom = "2px";
                BooksDiv.appendChild(element);
            });
        });
        onBookSelected(1);
    }

    
    
    app.start();
})();

// Use this for any popup box (to close it on document click)
function PreventDefaultAction(e) {
    e.cancelBubble = true; //IE
    e.stopPropagation();
    e.preventDefault();
    return false;
} //PreventDefaultAction()


function onBookSelected(bookId) {
    var books = gBooks.getBooks();
    var book = books[bookId - 1];
    //var item = this.getAttribute("bookitem");
    if (book == null)
        return;
    
    var chapter = new Chapter();
    chapter.load(book.BookID, 1, renderChapter, null);
}

function renderChapter(chapter) {
    while (ChapterDiv.hasChildNodes()) {
        ChapterDiv.removeChild(ChapterDiv.lastChild);
    }
    
    ChapterHeader = document.createElement("div");
    ChapterHeader.innerText = chapter.BookName + " " + chapter.ChapterNumber;
    ChapterHeader.setAttribute("class", "chapterheader");
    ChapterDiv.appendChild(ChapterHeader);
    
    var template = ChapterTemplate.winControl;
    chapter.Verses.forEach(function (item) {
        template.render(item).then(
        function (element) {
            //element.setAttribute("onclick", "javascript:onBookSelected(" + item.BookID + ");");
            //element.setAttribute("bookitem", item);
            //element.setAttribute("bookitem", item);
            ChapterDiv.appendChild(element);
        });
    });
}