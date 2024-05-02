
let Switch=false;
const searchFunction = ()=>{
    let search = document.getElementById("searchBar").value;
    search = search.toLowerCase();
    fetch("./travel_recommendation_api.json")
    .then(response=> response.json())
    .then(data=>{
        if(data.hasOwnProperty(search)){
            Switch=true;
        }
        display();
    } );
}
const clearFunction = ()=>{
    document.getElementById("searchBar").value = '';
}
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchFunction);
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click",clearFunction);

const generateCardHTML = (card) => {
    return `
        <div class="card">
            <img src=${card.imageUrl}>
            <h2>${card.name}</h2>
            <p>${card.description}</p>
            <button>visit</button>
        </div>
    `;
};
const display = ()=>{
    const container = document.getElementById("displayCard");
    container.innerHTML = "";
    let search = document.getElementById("searchBar").value;
    search = search.toLowerCase();
    const div = document.getElementById("timeZone");
    const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const newYorkTime = new Date().toLocaleTimeString('en-US', options);
    div.innerHTML = `<h3>Current time in New York:, ${newYorkTime})<h3>`;
    fetch("./travel_recommendation_api.json")
    .then(response=> response.json())
    .then(data=>{
        if(Switch){
            
                if(data.hasOwnProperty(search)){
                    data[search].forEach(element => {
                        container.innerHTML += generateCardHTML(element);
                        console.log(container);
                    });
                }
        }
        else{
            data.countries.forEach(element =>{
                if(element.name.toLowerCase().includes(search)){
                    element.cities.forEach(card =>{
                        container.innerHTML += generateCardHTML(card);
                        console.log(container);
                    });
                }
            })
        }
    });
};