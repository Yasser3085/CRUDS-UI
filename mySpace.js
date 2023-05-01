let title = document.getElementById('title')
let price = document.getElementById('price')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let taxs = document.getElementById('taxs')
let create = document.getElementById('create')
let count = document.getElementById('count')
let category = document.getElementById('category')
let search = document.getElementById('searchtxt')
let mood ='create';
let tmp;


// get total price 
function getTotal(){

if(price.value != ''){
    let result = (+price.value + +taxs.value + +ads.value) - +discount.value 
    total.innerHTML = result ;
total.style.background = 'green' ;
    
} else {
    total.innerHTML = ``;
    total.style.background = 'red'
}

}

// store the data in array and save it in local storage 
let dataPro ; 

if(localStorage.Product != null) {
    dataPro = JSON.parse(localStorage.Product) 
}else{

    dataPro = [];

}

// create product function 
create.onclick = function() {

let Newpro = {

title:title.value.toLowerCase(),
price:price.value,
taxs:taxs.value,
ads:ads.value,
discount:discount.value,
total:total.innerHTML,
category:category.value.toLowerCase() ,
count:count.value,

}

if(title.value != '' && price.value != '' && category.value != '' && Newpro.count <= 100 ){
if( mood ==='create'){
    if(Newpro.count > 1 ){
for(let i = 0 ; i < Newpro.count ; i++){
    dataPro.push(Newpro) ;
}
    
}else {

    dataPro.push(Newpro)
}
}else {
   dataPro[tmp] = Newpro
   mood ='create';
   create.innerHTML = 'Create' ;
   count.style.display = 'block'
}
clearData()
}




localStorage.setItem('Product',JSON.stringify(dataPro));

showData()



}

// clear inputs

function clearData(){

title.value = ''
price.value = ''
taxs.value = ''
ads.value = ''
discount.value = ''
total.innerHTML = ''
total.style.background = 'red'
category.value = ''
count.value = ''
}

// function to show the table for users 

function showData(){


let table = '' ;
for(i = 0 ; i < dataPro.length ; i++){
table += `
<tr>
<td>${i+1}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>

<td><button onclick= "updateItem(${i})" id="Update">Update</button></td>
<td><button onclick = "deleteItem( ${i}  )" id="Delete">Delete</button></td>
</tr>` ;
}

document.getElementById('tbody').innerHTML = table ;
let DeleteAll = document.getElementById('deleteAll')
if(dataPro.length > 0 ){

DeleteAll.innerHTML = `<button onclick ="deleteAll()" > Delete All ( ${dataPro.length } ) </button>`

}else {
    DeleteAll.innerHTML = ''
}

}

showData()

// function to delete one item from table !! 

function deleteItem(i){

dataPro.splice(i,1);
localStorage.Product= JSON.stringify(dataPro);
showData();

}

// delete all items function 

function deleteAll(){

localStorage.clear();
dataPro.splice(0);
showData()
}

// function to UPDATE the item 

function updateItem(i){

title.value = dataPro[i].title ;
price.value = dataPro[i].price ;
ads.value = dataPro[i].ads ;
discount.value = dataPro[i].discount ;
getTotal()
count.style.display = `none`
category.value = dataPro[i].category ;
create.innerHTML = 'Update'
mood ='update'
tmp = i ;
scroll({
    top : 0 ,
    behavior : 'smooth'
})
}

// search items 
let searchMood = 'title'

function getsearchmood(id){

if(id ==='searchtitle'){
searchMood = 'title'
search.placeholder = 'Search by Title'

} else {

    searchMood = 'category'
    search.placeholder = 'Search by Category'
}
search.focus();
search.value = '';
showData()


}


function searchitems(value){
let table = '';
if(searchMood === 'title'){

for(i=0;i<dataPro.length;i++){
if(dataPro[i].title.includes(value.toLowerCase())){
    table += `
<tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>

<td><button onclick= "updateItem(${i})" id="Update">Update</button></td>
<td><button onclick = "deleteItem( ${i}  )" id="Delete">Delete</button></td>
</tr>` ;

} 

}

}else{
    for(i=0;i<dataPro.length;i++){
        if(dataPro[i].category.includes(value.toLowerCase())){
            table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        
        <td><button onclick= "updateItem(${i})" id="Update">Update</button></td>
        <td><button onclick = "deleteItem( ${i}  )" id="Delete">Delete</button></td>
        </tr>` ;
        
        }}}
document.getElementById('tbody').innerHTML = table ;
}