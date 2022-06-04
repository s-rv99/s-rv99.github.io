async function loadData(){
	pages = 1;
	r = await fetch("https://raw.githubusercontent.com/s-rv99/s-rv99.github.io/main/json/assoc.json",{method:"GET"});
	assoc = await r.json();
	document.getElementById('l1').innerText = "✔";
	c = 1;
	text = "{\"time\":\"" + Date.now() + "\",\"data\":{";
	for(let p = 1; p <= pages; p++){
		r = await fetch("https://engine.freerice.com/group-members?_format=json&group=57a09e6b-505f-4192-95d5-d214e139fe9f&current=" + p + "&limit=50",{method:"GET"});
		jsonObj = await r.json();
		pages = jsonObj.meta.pagination.total_pages;
		document.getElementById('l2').innerText = p + "/" + pages;
		for(let i = 0; i < jsonObj.meta.pagination.count; i++){
			text += "\"" + jsonObj.data[i].attributes.user + "\":{\"rank\":\"" + c + "\",\"username\":\"" + assoc[jsonObj.data[i].attributes.user] + "\",\"rice\":\"" + jsonObj.data[i].attributes.rice + "\"}";
			if(c != jsonObj.meta.pagination.total){
				text += ",";
			}
			c++;
		}
	}
	text += "}}";
	document.getElementById('jsontext').innerText = text;
}
loadData();
