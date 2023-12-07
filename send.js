window.onload = function () {
    // 計算ボタンを押した際の動作を設定
    document.getElementById('send_button').onclick = function () {
        const host = document.getElementById('host').value
        const path = document.getElementById('path').value
        const url = host + path
        if (path === '/api/location') {
            const request_body = JSON.parse(document.getElementById('request_body').value);
            post(url, request_body);
        } else {
            get(url);
        }
    };

    document.getElementById('path').onchange = onPathChange;
}

const onPathChange = (e) => {
    const submit = document.getElementById('send_button');
    submit.disabled = true;
    const tid = document.getElementById('tid');
    const path = e.target.value;
    const request = document.getElementById('request');
    if (path === '/api/location') {
        request.hidden = false;
        const request_body = document.getElementById('request_body');
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(parseInt(position.timestamp / 1000))
            body = {
                tid: tid.value,
                gpsdata: [{
                    time: parseInt(position.timestamp / 1000),
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                }]
            }
            console.log(body);
            request_body.value = JSON.stringify(body, null, "\t");
            submit.disabled = false;
        });

    } else if (path === '/api/map/json') {
        request.hidden = true;
        submit.disabled = false;
    } else if (path === '/api/mode') {
        request.hidden = true;
        submit.disabled = false;
    }
}

function get(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Controll-Allow-Headers', '*');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    xhr.send();
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            const response_body = document.getElementById('response_body');
            const body = JSON.parse(xhr.responseText);
            response_body.value = JSON.stringify(body, null, "\t");;
        }
    }
}

function post(url, body) {
    const xhr = new XMLHttpRequest();
    const json_body = JSON.stringify(body);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Controll-Allow-Headers', '*');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    xhr.send(json_body);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            const response_body = document.getElementById('response_body');
            const body = JSON.parse(xhr.responseText);
            response_body.value = JSON.stringify(body, null, "\t");;
        }

    }

}