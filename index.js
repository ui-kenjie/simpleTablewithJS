const aside_width = document.querySelector('#sideNav')
const root_theme = document.querySelector(':root')
const table = document.querySelector('#tableSample')
const table_pagination = document.querySelector('#tablePagination')
const table_entries_perPage = document.querySelector('.entries-perPage select')
const table_input_search= document.querySelector('#tableSearch')
let table_array = [];

root_theme.style.setProperty('--asidePadding', parseInt(aside_width.offsetWidth) +3 + 'px');

const fetchFakeJson_API = async () => {
    const todos_response = await fetch('https://jsonplaceholder.typicode.com/todos/');
    const todos_json = await todos_response.json();
    return todos_json
}

const push_data = (query) => {
    table_array = []
    array = []
    fetchFakeJson_API().then((data) => {
        if (query != null) {
            let new_array = data.filter(el => (el.title.toLowerCase().includes(query) || el.completed.toString().toLowerCase().includes(query)))
            new_array.forEach(el => {
                table_array.push(el)
            })
        } else {
            data.forEach(element => {
                table_array.push(element)
            });
        }
        insert_into_table()
    })
    
}

const insert_into_table = (entries_per_page) => {
    table.classList.remove('show-data')
    table.querySelector('thead').innerHTML = '' // remove initial content
    table.querySelector('tbody').innerHTML = ''  // remove initial content
    let entries_perPage = (entries_per_page != null) ? entries_per_page : table_entries_perPage.value
    let pagination_active = (table_pagination.querySelector('.active') != null ) ? table_pagination.querySelector('.active').getAttribute('pagenum-value') : 1
    
    let x = parseInt(pagination_active-1) *entries_perPage
    let y = parseInt(x)+ parseInt(entries_perPage)

        if (table_array.length != 0 ) {
            table.querySelector('thead').innerHTML += `<tr></tr>`
            let table_th = (Object.keys(...table_array))
            for(let h = 0; h < table_th.length; h++ ) {
                table.querySelector('thead tr').innerHTML += 
                `<th class="bg-dark text-light"> ${table_th[h]} </th> `
            }
        } else {
            table.querySelector('thead').innerHTML += 
                `<th colspan="4" class="bg-dark text-light"> No Data Header </th> `
        }

        for (let z = x; z < y ; z++) {
            
            if ( z < table_array.length ) {
                
                table.querySelector('tbody').innerHTML += 
                ` <tr>  <td> ${table_array[z].userId} </td> 
                    <td> ${table_array[z].id} </td> 
                    <td> ${table_array[z].title} </td> 
                    <td> ${table_array[z].completed} </td>`
            } else if (table_array.length === 0) {
                table.querySelector('tbody').innerHTML = 
                `<td colspan="4" class="no-available-data"><span> No Available Data </span></td>`
            }
            
            
            if (z === y-1) {
                    table.classList.add('show-data')
            }
        }
        insert_into_pagination(table_array.length, entries_perPage, pagination_active)
}

const insert_into_pagination = (table_data_length, entries_perPage, set_active) => {
    table_pagination.innerHTML = ''
    let count_table_data = table_data_length
    let count_for_pages = Math.ceil(count_table_data/entries_perPage)
    
    for (let x=1; x <= count_for_pages; x++) {
        if (x === parseInt(set_active) && count_for_pages > 1) {
            table_pagination.innerHTML += `<li pagenum-value="${x}" class="active">${x}</li>`
        } else if (count_for_pages > 1) {
            table_pagination.innerHTML += `<li pagenum-value="${x}">${x}</li>`
        }
    }
    table_pagination_btn()
}

const table_pagination_btn = () => {
    table_pagination.querySelectorAll('li').forEach( btn => {
        btn.addEventListener('click', (e) => {
            table_pagination.querySelectorAll('li').forEach(element => {
                element.classList.remove('active')
            });
            e.target.classList.add('active')
            insert_into_table(table_entries_perPage.value)
        })
    })
}

table_entries_perPage.addEventListener('change', (event) => {
    insert_into_table(event.target.value)
})

table_input_search.addEventListener('change', (e) => {
    push_data(e.target.value)
})


push_data()
