var events = new Set();

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

var addRemoveEvent = (elem, phoneNumber)=>{
    let li = elem.nextElementSibling;
    let e = li.value==undefined ? li.innerHTML : li.value;
    if( phoneNumber.length < 10 || isNaN(Number(phoneNumber))){
        alert("Enter Valid Number");
    }
    else{
        action = "";
        if(events.has(e)){
            action="Removing";
            events.delete(e);
        }else{
            action="Adding"
            events.add(e)
        } 
        alert(`${action} '${e}' event to ${phoneNumber}. `+ "<..API/Lambda request>");
    }
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