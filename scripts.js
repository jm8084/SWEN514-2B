


//const API_URL = "https://r7ovyximrl.execute-api.us-east-1.amazonaws.com/dev";

//^^ Leave space above for terraoform to inject api url into file as: API_URL = '...'; 
// create an API_URL variabl for local testing (copy invoke url from api gateway deployment)
// const API_URL = "INVOKE_URL" 


// load table data ocne loaded/
document.addEventListener('DOMContentLoaded', ()=>{

    document.addEventListener
    //getParkinglots();
    updateTable(data);
    

    $.get(
        "https://fi5l3eo2c8.execute-api.us-east-1.amazonaws.com/dev/",
        { },
        function(data) {
           alert('page content: ' + data);
        }
    );
});

data = [{
    'totalSpots': 4,
    'occupiedSpotIds': [0, 2, 4], 
    'dateTime': '02', 
    'id': '1', 
    'numberOfCars': 3
}, {
    'totalSpots': 4, 
    'occupiedSpotIds': [0, 2], 
    'dateTime': '01', 
    'id': '0', 
    'numberOfCars': 2
}];

document.querySelectorAll('.stream').forEach(element => {
    element.addEventListener("click", toggleStream(element));
    console.log('here');
});
const activeLot = 1;

const toggleStream = (elem) =>{
    if(elem.className != "activeStream"){
        let active = document.querySelector('.activeStream');
        active.className = "stream"

        elem.className = "stream activeStream"
        elem.style.property = 'activeStream';
        setActiveLot(Number(elem.firstElementChild.innerHTML));
    }
    
};

const setActiveLot = (lot) =>{
    if(lot == 1){

    }else if(lot == 2){

    }else if (lot == 3){

    }
    activeLot = lot;
};

const updateTable = (data) => {

    let table = document.getElementById("eventTable");
    data.forEach(item => {
        let row = table.insertRow(1);
        row.insertCell(0).innerHTML = item['id'];
        row.insertCell(1).innerHTML = item['totalSpots']-item['numberOfCars'];
        row.insertCell(2).innerHTML = item['numberOfCars'];
        row.insertCell(3).innerHTML = item['occupiedSpotIds'];
        row.insertCell(4).innerHTML = item['dateTime'];
    });
}

function subsc(){
    let socket = new WebSocket("wss://r7ovyximrl.execute-api.us-east-1.amazonaws.com/dev/subscribe");

    socket.onopen = function(e) {
    alert("[open] Connection established");
    alert("Sending to server");
    let req = {
        "identifier":identifier,
        "request":request,
        "lot":lot,
        "email":email}

    socket.send(req);
    };

    socket.onmessage = function(event) {
    alert(`[message] Data received from server: ${event.data}`);
    };

    socket.onclose = function(event) {
    if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert('[close] Connection died');
    }
    };

    socket.onerror = function(error) {
    alert(`[error]`);
    };
}


//API- SUBSCRIBE TOPIC
function subscribe(form){
    const identifier = document.getElementById('identifier').value;
    const request = document.getElementById('request').value;
    const email = document.getElementById('email').value;
    const lot = document.querySelector('.activeStream');
    console.log("HERE!");
    console.log(form);
    var raw = JSON.stringify({
        "identifier":identifier,
        "request":request,
        "lot":lot,
        "email":email});

    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myheaders.append('Authorization', "none");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', '*');
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({
        "identifier":identifier,
        "request":request,
        "lot":lot,
        "email":email});
    console.log(raw);
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch(`${API_URL}/subscribe?identifier=${identifier}&request=${request}&lot=${lot}&email=${email}`)
    .then(response => {
        alert.log(response.text());
        return response.json;
    })
    .then(result => alert(result))
    .catch(error => console.log('error', error));
}

//API- GET PARKINGLOTS
function getParkinglots(){
    
    var myHeaders = new Headers();
    // add content type header to object
    //myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        header: myHeaders
    };
    // make API call with parameters and use promises to get response
    fetch(`${API_URL}/parkinglots`, requestOptions)
    .then(response => {
        console.log(response.json());
        return response.json()
    }).then(result => {
        console.log(result["result"]['message']);//updateTable(JSON.parse(result).body)
    })
    .catch(error => console.log('error', JSON.parse(error)));
}

require('Node:http');