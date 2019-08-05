
document.addEventListener('DOMContentLoaded', () => {
  const allBooks = `http://localhost:3000/books/`
  const currentUser = {"id":11, "username":"dylan"}
  function init() {
    fetch(allBooks)
    .then(res => res.json())
    .then(data => data.map(book => renderBookList(book)))
  }

  function renderBookList(book) {
    let div = document.querySelector('#list')

    let name = document.createElement('li')
    name.innerText = book.title
    name.setAttribute('data-id', book.id)
    name.addEventListener('click', handleClick)

    div.appendChild(name)
  }

  function handleClick(e) {
    // console.log(e.target.dataset.id)
    getBook(e.target.dataset.id, renderShowPage)
  }

  function getBook(id, callback) {
    fetch(allBooks + id)
    .then(res => res.json())
    .then(callback)
  }

  function renderShowPage(book) {
    let div = document.querySelector('#show-panel')
    div.innerHTML = ""

    let name = document.createElement('h2')
    name.innerText = book.title

    let img = document.createElement('img')
    img.src = book.img_url

    let description = document.createElement('p')
    description.innerText = book.description

    let likeBtn = document.createElement('button')
    likeBtn.innerText = "Like Book"
    likeBtn.setAttribute('data-id', book.id)
    likeBtn.addEventListener('click', handleLikeBtn)

    let ul = document.createElement('ul')
    ul.className = 'user-list'

    for(let i = 0; i < book.users.length; i++) {
      let li = document.createElement('li')
      li.className = 'newUserList'
    li.innerText = book.users[i].username
    ul.appendChild(li)
  }
    


    div.appendChild(name)
    div.appendChild(img)
    div.appendChild(description)
    div.appendChild(likeBtn)
    div.appendChild(ul)
  }

  function handleLikeBtn(e) {
    // console.log(e.target.dataset.id)
    getBook(e.target.dataset.id, likeBook)
  }

  function likeBook(book) {
    originalUsers = book.users
    allUsers = originalUsers.map(user => user.username)
    if(allUsers.includes(currentUser.username)) {
      alert("You already liked this book")
    }
    else{allUsers.push(currentUser.username)}
    fetch(allBooks + book.id, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        users: currentUser
      })
    })
    .then(res => res.json())
    let ul = document.querySelector('.user-list')

    let newUser = document.createElement('li')
    newUser.innerText = currentUser.username
    ul.appendChild(newUser)
  }

  init()
})


































// document.addEventListener('DOMContentLoaded', () => {
//   const allBooks = `http://localhost:3000/books/`
//   const currentUser = {"id":11, "username":"dylan"}

//   function init() {
//     fetch(allBooks)
//     .then(res => res.json())
//     .then(data => data.map(renderBooksList))
//   }

//   function renderBooksList(book) {
//     // 
//     let divMain = document.querySelector('#list-panel')

//     let div = document.querySelector('#list')

//     let name = document.createElement('li')
//     name.innerText = book.title
//     name.setAttribute('data-id', book.id)
//     name.addEventListener('click', handleShowPage)
//     divMain.appendChild(div)
//     div.appendChild(name)
//   }

//   function handleShowPage(e) {
//     // console.log(e.target.dataset.id)
//       getBook(e.target.dataset.id, renderShowPage)
//   }

//   function getBook(id, callback) {
//     fetch(allBooks + id) 
//     .then(res => res.json())
//     .then(callback)
//   }

//   function renderShowPage(book) {
//     let div = document.querySelector('#show-panel')
//     div.innerHTML = ""
//     let name = document.createElement('h2')
//     name.innerText = book.title

//     let img = document.createElement('img')
//     img.src = book.img_url

//     let info = document.createElement('p')
//     info.innerText = book.description

//     let likeBtn = document.createElement('button')
//     likeBtn.innerText = "Like Book"
//     likeBtn.setAttribute('data-id', book.id)
//     likeBtn.addEventListener('click', handleLike)

//     let usersList = document.createElement('h3')
//     usersList.innerText = "List of Users"

//     let ul = document.createElement('ul')
//     ul.className = 'users-list'

//     // let li = document.createElement('li')
//     for(let i = 0; i < book.users.length; i++) {
//       let li = document.createElement('li')
//         li.innerText = book.users[i].username
//         ul.appendChild(li)
//     }

//     div.appendChild(name)
//     div.appendChild(img)
//     div.appendChild(info)
//     div.appendChild(likeBtn)
//     div.appendChild(ul)
//   }

// function handleLike(e) {
//   // debugger
//   console.log(e.target.dataset)
  
//   getBook(e.target.dataset.id, likeBook)
// }

// function likeBook(book) {
//   let ulSecond = document.querySelector('.users-list')
//  let originalUsers = book.users
//  let allUsers = originalUsers.map(user => user.username)
//   // debugger
//   console.log(originalUsers)
//   if(allUsers.includes(currentUser.username)) {
//     alert("You already liked this book")
//   }
//   else {originalUsers.push(currentUser)}
//     fetch(allBooks + book.id, {
//       method: "PATCH", 
//       headers: {
//         "Content-Type": "application/json", 
//         accept: "application/json"
//       },
//       body: JSON.stringify({
//         users: currentUser
//       })
//     })
//     .then(res => res.json())
//     .then(console.log)
//   let newUser = document.createElement('li')
//   newUser.innerText = currentUser.username
//   ulSecond.appendChild(newUser)

//   }
  



//   init()
// })