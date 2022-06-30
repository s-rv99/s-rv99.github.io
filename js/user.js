async function getUser(){
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
        if(pair[0] == "uuid"){
            r = await fetch("https://accounts.freerice.com/public/users/?uuids=" + pair[1],{method:"GET"});
            jsonUser = await r.json();
            elem = document.getElementById('uuid');
            elem.innerText = pair[1]
            elem = document.getElementById('username');
            elem.innerText = jsonUser[pair[1]]['name'];
            elem = document.getElementById('avatar');
            elem.innerText = jsonUser[pair[1]]['avatar'];
            r = await fetch("https://engine.freerice.com/users/" + pair[1],{method:"GET"});
            jsonUser = await r.json();
            elem = document.getElementById('badges');
            elem.innerText = jsonUser['data']['attributes']['badges'].length;
            elem = document.getElementById('totrice');
            elem.innerText = jsonUser['data']['attributes']['rice'];
            elem = document.getElementById('totrank');
            elem.innerText = jsonUser['data']['attributes']['rank'];
            elem = document.getElementById('sessions');
            elem.innerText = jsonUser['data']['attributes']['session count'];
            console.log(jsonUser['data']['attributes']);
            r = await fetch("https://engine.freerice.com/group-members/57a09e6b-505f-4192-95d5-d214e139fe9f--" + pair[1],{method:"GET"});
            jsonUser = await r.json();
            elem = document.getElementById('grouprice');
            elem.innerText = jsonUser['data']['attributes']['rice'];
            elem = document.getElementById('grouprank');
            elem.innerText = jsonUser['data']['attributes']['rank'];
            break;
        }
    }
}
getUser();