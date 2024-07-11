let aside_width = document.querySelector('#sideNav');
let root_theme = document.querySelector(':root');

root_theme.style.setProperty('--asidePadding', parseInt(aside_width.offsetWidth) +3 + 'px');



const apiCall = async () => {
    const apiCallPromise  = await 
    fetch('https://jsonplaceholder.typicode.com/todos');
    const apiCallObj = await apiCallPromise.json();
    return apiCallObj;
};


const tableContent = (page_number, list_number) => {
    
    let startTo_page = page_number;
    let numberOf_item_perPage = 9;

    apiCall().then( objectText => {
        let tableSample = document.querySelector('#tableSample tbody');
        let tablePagination = document.querySelector('.tableWrapper') 
        
        const array2 = objectText;
        let array3 = [];
        for(c=startTo_page; c < startTo_page+numberOf_item_perPage; c++) {
            if(c <= array2.length) {
                array3.push(array2[c-1])
            } 
        }

        array3.forEach(element => {
                tableSample.innerHTML += `<tr>  <td>${element.userId}</td> <td>${element.id}</td>  <td>${element.title}</td>  <td>${element.completed}</td>  </tr>`;
        });

        let total_pages = Math.ceil(array2.length/numberOf_item_perPage)
        if (total_pages > 1) {
                        tablePagination.innerHTML += '<div class="table-pagination"><ul class="pagination float-end mt-3"> </ul></div>'
                        let tablePaginationlist = document.querySelector('.pagination') 
                        for(i=1; i <= total_pages; i++) {
                        tablePaginationlist.innerHTML += `<li pagenum="${i}">${i}</li>`
         }
         btnpagination_eventListener()
        }
        
        
    })

}

const btnpagination_eventListener = () => {
    let btn_pagination123 = document.querySelectorAll('.pagination > li');

    btn_pagination123.forEach(btn_pagenum => {
        btn_pagenum.addEventListener('click', (e) => {
            let mainTable = document.querySelector('#tableSample tbody');
            let tablePaginationlist = document.querySelector('.pagination');
            tablePaginationlist.innerHTML = '';
            mainTable.innerHTML = '';
            let pagenum = (parseInt(e.target.getAttribute('pagenum')-1) *10) +1
            tableContent(pagenum)
        })
    })
}

tableContent(21)



