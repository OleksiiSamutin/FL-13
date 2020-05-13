const Books = [
    {
        name: 'Eloquent JavaScript: A Modern Introduction to Programming',
        author: 'Marijn Haverbeke',
        image: 'https://hackr.io/blog/uploads/images/1570190914aIEpTrZrwj.jpg',
        plot: `This edition is thoroughly revised and modernized to reflect the current state
        of Java­Script and web browsers, with brand-new material,
        such as a chapter on code performance in Java­Script,
        and expanded coverage of recursion and closures.
        All source code is available online in an inter­active sandbox,
        where you can edit the code, run it, and see its output instantly.`
    },
    {
        name: 'JavaScript: The Definitive Guide',
        author: 'David Flanagan',
        image: 'https://hackr.io/blog/uploads/images/1570190914bjDgwA0nFR.jpg',
        plot: `Another beginner-friendly JavaScript book is the JavaScript:
        The Definitive Guide. Anyone interested in building powerful web applications
        must go through the comprehensive JS book.
        It explores several JS and web platform API features aimed at web application development.`
    },
    {
        name: 'A Smarter Way to Learn JavaScript: The new tech-assisted approach that requires half the effort',
        author: 'Mark Myers',
        image: 'https://hackr.io/blog/uploads/images/1570190914jYoRj7fSQj.jpg',
        plot: `The entire 256-page long JavaScript book is judiciously divided into brief chapters.
        Each of the chapters is followed by 20 absolutely-free sample exercises
        available at the author’s website.
        You can do them over and over again to completely digest all the information you just read.`
    }
]
if (localStorage.length === 0){
    Books.forEach((item, index) => {
        localStorage.setItem(index,JSON.stringify(item))
    })
}
