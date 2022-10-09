const errorDiv=document.getElementById('error');

const searchBook=()=>{
    const searchField=document.getElementById('search-field');
    
    const inputValue=searchField.value;
    if(inputValue===''){
        errorDiv.innerText='Search field cannot be empty';
        return;
    }
    // console.log(inputValue);
    searchField.value='';
    
    fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
    .then(res => res.json())
    .then(data=>displayBookResult(data.docs))

}


const displayBookResult=(books)=>{
    const searchResult=document.getElementById('search-result');
    searchResult.innerHTML = '';
    if(books.message==='Not found'){
        errorDiv.innerText='No search result found'
    }
    else{
        errorDiv.innerText='';
    }
    
    books.forEach(book=>{
       
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Book Name:${book.title}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Book author:${book.author_name}</li>
            <li class="list-group-item">Publish Year:${book.first_publish_year}</li>
          
          </ul>
        
      </div>
        `
        searchResult.appendChild(div);
    })
}