let aside_width = document.querySelector('#sideNav')
let root_theme = document.querySelector(':root')
const btn_entriesperPage = document.querySelector('.entries-perPage select')


root_theme.style.setProperty('--asidePadding', parseInt(aside_width.offsetWidth) +3 + 'px');



const fetchFakeJson_API = async () => {
    const todos_response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos_json = await todos_response.json();
    return todos_json 
}


const get_todos = (page_number) => {
    fetchFakeJson_API().then(todos => {
        
        let todos_array = todos
        let page_selected = page_number
        let todos_count_perPage = parseInt(btn_entriesperPage.value)
        let table_todos = document.querySelector('table#tableSample')

        if (page_selected == null) {
            page_selected = 1;
        }

        let n = (page_selected-1) *todos_count_perPage
        let array_end = n +todos_count_perPage
        table_todos.querySelector('tbody').innerHTML = ''
        do {
            table_todos.querySelector('tbody').innerHTML += `<tr> <td>${todos_array[n].userId}</td> <td>${todos_array[n].id}</td> <td>${todos_array[n].title}</td> <td>${todos_array[n].completed}</td> </tr>`
            n++
        } while (n < array_end);
        
        let page_count = Math.ceil(todos_array.length/todos_count_perPage);
        if ( page_count > 1 ) {
            let tablePagination = document.querySelector('.table-pagination');
            tablePagination.querySelector('.pagination').innerHTML = ''
            for(i=1; i <= page_count; i++) {
                if ( i == page_selected ) {
                    tablePagination.querySelector('.pagination').innerHTML += `<li class='active' value="${i}">${i}</li>`
                } else {
                    tablePagination.querySelector('.pagination').innerHTML += `<li value="${i}">${i}</li>`
                }
                
            }
            paginations_function()
        }

    })
}


get_todos()


btn_entriesperPage.addEventListener('change', (e) => {
    get_todos()
})

const paginations_function = () => {
        let btn_pagination = document.querySelectorAll('.pagination li')
        btn_pagination.forEach(btn => {
            btn.addEventListener('click', (event) => {
                get_todos(event.target.getAttribute('value'))
            })
        })
}



