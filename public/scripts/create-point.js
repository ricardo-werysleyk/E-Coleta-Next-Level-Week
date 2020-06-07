document.querySelector("select[name=uf]").addEventListener("change", getCities);
document.querySelector("select[name=cidade]").addEventListener("change", getCity);
document.querySelector("button[type=submit]").addEventListener("click", enviarForm);


populateUFs(); 

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

    requisicaoFetch(url,ufSelect);
}

function getCity(event){
    const cityInput = document.querySelector("input[name=city]");

    const indexOfSelectedCity = event.target.selectedIndex;

    cityInput.value = event.target.options[indexOfSelectedCity].text;
}

function getCities(event) {
    const citiesSelect = document.querySelector("select[name=cidade]");
    const stateInput = document.querySelector("input[name=state]");


    citiesSelect.innerHTML = '<option value="">Selecione a cidade</option>';

    const indexOfSelectedState = event.target.selectedIndex;

    stateInput.value = event.target.options[indexOfSelectedState].text;

    const ufValue = event.target.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    requisicaoFetch(url,citiesSelect);
    
    
    if(event.target.value != '')
        citiesSelect.removeAttribute('disabled');
    else
        citiesSelect.setAttribute('disabled',true);
}

function requisicaoFetch(url,node){
    fetch(url)
        .then( res => res.json() )
        .then( data => {
            for(const obj of data){
                node.innerHTML += `<option value="${obj.id}">${obj.nome}</option>`;
            }
        });
}

function enviarForm(event){
    // event.preventDefault();
}

//items de coleta

var itemsToCollect = document.querySelectorAll('.items-grid li');

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;
    const itemId = itemLi.dataset.id;
    
    itemLi.classList.toggle("selected")

    const alreadySelected = selectedItems.findIndex( item => item == itemId);

    if(alreadySelected != -1){
        const filteredItems = selectedItems.filter( item => item != itemId);
        selectedItems = filteredItems;
    }else{
        selectedItems.push(itemId);
    }
 
    collectedItems.value = selectedItems;
}