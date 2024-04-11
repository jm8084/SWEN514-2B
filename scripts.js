var events = new Set();

/** Update atble content over time */
document.addEventListener('DOMContentLoaded', ()=>{

    setTimeout(()=>{
        let table = document.getElementById("eventTable");
        let row = table.insertRow(1);

        row.insertCell(0).innerHTML = "Parking Capacity";
        row.insertCell(1).innerHTML = "2/12";
        row.insertCell(2).innerHTML = "1min"
        row.insertCell(3).innerHTML = "..."
    },8000);
    
    let vidDoc = document.getElementById("stream").srcdoc();
    console.log("debug:");
    console.log(vidDoc);

});

document.querySelectorAll('.stream').addEventListener('click', (e)=> toggleStream(e));
const toggleStream = (elem)=>{
    alert("Here!");
    let active = document.querySelector('.activeStream');
    active.removeProperty('.activeStream');

    elem.style.property = '.activeStream';

    
};

var takeshot = () => {
    const iframe = document.getElementsByTagName('iframe');
    const screen = iframe[0]?.contentDocument?.body;

    // Use the html2canvas
    // function to take a screenshot
    // and append it
    // to the output div
    html2canvas(iframe).then(
        function (canvas) {
            document
            .getElementById('output')
            .appendChild(canvas);
        })
};

// SUBSCRIBE TOPIC
const subscribe = (email)=>{
    const identifier = document.getElementById('identifier').value;
    const request = document.getElementById('request').value;
    const email = document.getElementById('email').value;
    const lot = document.querySelector('.activeStream');

    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"email":email});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://mybeeog2j7.execute-api.us-east-1.amazonaws.com/dev/subscribe", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
}

