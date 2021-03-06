async function loadData(){
	pages = 1;
	table = document.getElementById('b');
	footer = document.getElementById('f');
	r = await fetch("https://raw.githubusercontent.com/s-rv99/s-rv99.github.io/main/json/assoc.json",{method:"GET"});
	assoc = await r.json();
	document.getElementById('l1').innerText = "✔";
	r = await fetch("https://raw.githubusercontent.com/s-rv99/s-rv99.github.io/main/json/cheaters.json",{method:"GET"});
	jsonCheat = await r.json();
	console.log(jsonCheat);
	document.getElementById('l2').innerText = "✔";
	c = 0;
	total = 0;
	for(let p = 1; p <= pages; p++){
		r = await fetch("https://engine.freerice.com/group-members?_format=json&group=57a09e6b-505f-4192-95d5-d214e139fe9f&current=" + p + "&limit=50",{method:"GET"});
		jsonObj = await r.json();
		pages = jsonObj.meta.pagination.total_pages;
		document.getElementById('l3').innerText = p + "/" + pages;
		for(let i = 0; i < jsonObj.meta.pagination.count; i++){
			if(!jsonCheat.cheaters.includes(jsonObj.data[i].attributes.user)){
				row = table.insertRow(c++);
				cell1 = row.insertCell(0);
  				cell2 = row.insertCell(1);
  				cell3 = row.insertCell(2);
				cell1.innerText = c;
  				cell2.innerText = assoc[jsonObj.data[i].attributes.user];
				if(cell2.innerText == "undefined"){
					console.log(jsonObj.data[i].attributes.user);
				}
  				cell3.innerText = jsonObj.data[i].attributes.rice;
				total += jsonObj.data[i].attributes.rice;
			}
		}
	}
	row = footer.insertRow(0);
	cell1 = row.insertCell(0);
  	cell2 = row.insertCell(1);
  	cell3 = row.insertCell(2);
	cell3.innerText = total;
	document.getElementById('load').classList.add('hide');
}
loadData();