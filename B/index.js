
window.onload = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyCREkcGqSUa32YbeigBkPZWJG3UQiQwroM",
        authDomain: "testcf-3de02.firebaseapp.com",
        databaseURL: "https://testcf-3de02.firebaseio.com",
        projectId: "testcf-3de02",
        storageBucket: "testcf-3de02.appspot.com",
        messagingSenderId: "986137901330",
        appId: "1:986137901330:web:6165eb324ec04df01e1bcb",
        measurementId: "G-MT9VVZP592"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.auth().signInWithEmailAndPassword('trinhvumhieu@gmail.com', 'mh0811').then(() => {
        const addForm = document.getElementById('add-form')
        addForm.addEventListener('submit', e => {
            e.preventDefault()
            const booksInfo = {
                name: addForm.book.value,
                author: addForm.author.value,
                read: false,
            }
            controller.checkAddedBook(booksInfo)
        })

    })
    // view.showAllBook()
    controller.onSnapshot()
}
var test
const view = {}
view.resetForm = () => {
    const addForm = document.getElementById('add-form')
    addForm.book.value = ''
    addForm.author.value = ''
}
view.setError = (element, errorMessage) => {
    element.innerText = errorMessage
}
view.creatElementWithClassName = className => {
    const element = document.createElement('div')
    element.className = className
    return element
}
view.showAllBook = () => {
    firebase.firestore().collection('books').where('read', '==', false).get().then(res => {
        data = controller.getDataFormRes(res.docs)
        const unreadList = document.getElementById('unread-list')
        unreadList.innerHTML = `<h2>These books are not read yet</h2>`
        for(let i = 0; i < data.length; ++i) {
            const bookWrapper = view.creatElementWithClassName('book-wrapper')
            bookWrapper.id = data[i].id
            const bookName = view.creatElementWithClassName('book-name')
            bookName.innerText = data[i].name
            const bookAuthor = view.creatElementWithClassName('book-author')
            bookAuthor.innerText = data[i].author
            const checkRead = document.createElement('input')
            checkRead.type = 'checkbox'
            checkRead.onclick = e => {controller.readBook(e)} 
            bookWrapper.appendChild(bookName)
            bookWrapper.appendChild(bookAuthor)
            bookWrapper.appendChild(checkRead)
            unreadList.appendChild(bookWrapper)
        }
    })
    firebase.firestore().collection('books').where('read', '==', true).get().then(res => {
        data = controller.getDataFormRes(res.docs)
        const unreadList = document.getElementById('read-list')
        unreadList.innerHTML = `<h2>These books are read</h2>`
        for(let i = 0; i < data.length; ++i) {
            const bookWrapper = view.creatElementWithClassName('book-wrapper')
            bookWrapper.id = data[i].id
            const bookName = view.creatElementWithClassName('book-name')
            bookName.innerText = data[i].name
            const bookAuthor = view.creatElementWithClassName('book-author')
            bookAuthor.innerText = data[i].author
            bookWrapper.appendChild(bookName)
            bookWrapper.appendChild(bookAuthor)
            unreadList.appendChild(bookWrapper)
        }
    })
}
const controller = {}
controller.checkAddedBook = booksInfo => {
    if(booksInfo.name == '') view.setError(document.getElementById('error-book'), "Type the book's name")
    else view.setError(document.getElementById('error-book'), "")
    if(booksInfo.author == '') view.setError(document.getElementById('error-author'), "Type the book's author")
    else view.setError(document.getElementById('error-author'), "")
    if(booksInfo.name != '' && booksInfo.author != '') {
        firebase.firestore().collection('books').add(booksInfo).then(res => {
            firebase.firestore().collection('books').doc(res.id).update({id: res.id})
            view.resetForm()
        })
    }
}
controller.getDataFormRes = docs => {
    const data = []
    for(let i = 0; i< docs.length; ++i) {
        data.push(docs[i].data())
    }
    return data
}
controller.readBook = e => {
    firebase.firestore().collection('books').doc(e.srcElement.parentElement.id).get().then(res => {
        console.log(res.data())
        const book = res.data()
        book.read = true
        firebase.firestore().collection('books').doc(e.srcElement.parentElement.id).update(book)
    })
}
controller.onSnapshot = () => {
    firebase.firestore().collection('books').onSnapshot(res => {
        console.log(res.docChanges())
        const docChanges = res.docChanges();
        if(docChanges != undefined) {
            const docChangeType = docChanges[0].type
            if (docChangeType == 'added' || docChangeType == 'modified') {
                view.showAllBook()
            }
        }
    })
}