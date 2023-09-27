//utility functions
function getElementFromString(string) {
    let div = documnet.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
//initialise no of parameters
let addedParamCount = 0;



//hide the parameter box inititaly
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

let jsonRadioRadio = document.getElementById('jsonRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
    </div>
    <button class="btn btn-primary deleteParam"> - </button>
    </div>`;

    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // TODO: add a confirmation box to confirm parameter deletion
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})


let sumbit = document.getElementById('submit');
sumbit.addEventListener('click', () => {
    document.getElementById('responseJsonText').value = "Please wait..Fetching response...";

    let url = document.getElementById("url").value;
    let reqestType = document.querySelector("input[name='reuestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {

                let key = documnet.getElementById('parameterKey' + (i + 1)).value;
                let value = documnet.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
            data = JSON.stringify(data);
        }
    }
    else {
        data = document.getElementById('requestJsonText').value
    }
    console.log('url is ', url);
    console.log('request is ', requestType);
    console.log('content is ', contentType);
    console.log('data is ', data);
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }

    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });

    }


});

