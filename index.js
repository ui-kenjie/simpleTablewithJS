let aside_width = document.querySelector('#sideNav');
let root_theme = document.querySelector(':root');

root_theme.style.setProperty('--asidePadding', parseInt(aside_width.offsetWidth) +3 + 'px');



const apiCall = async () => {
    const apiCallPromise  = await 
    fetch('https://jsonplaceholder.typicode.com/todos');
    const apiCallObj = await apiCallPromise.json();
    return apiCallObj;
};
const tableContent = () => {
    
    let x = 20;
    let i = 0;

    apiCall().then( objectText => {
        let tableSample = document.querySelector('#tableSample tbody');
        
        const array2 = objectText;
        array2.forEach(element => {

                if(i < x ) {
                    tableSample.innerHTML += `<tr>  <td>${element.userId}</td> <td>${element.id}</td>  <td>${element.title}</td>  <td>${element.completed}</td>  </tr>`
                }
                
                i = i +1;
        });

    })

}

console.log(apiCall())
tableContent()