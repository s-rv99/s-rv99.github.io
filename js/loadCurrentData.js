async function loadData(){
	pages = 1;
	table = document.getElementById('b');
	footer = document.getElementById('f');
	r = await fetch("https://raw.githubusercontent.com/s-rv99/s-rv99.github.io/main/json/assoc.json",{method:"GET"});
	assoc = await r.json();
	document.getElementById('l1').innerText = "✔";
	r = await fetch("https://raw.githubusercontent.com/s-rv99/s-rv99.github.io/main/json/cheaters.json",{method:"GET"});
	jsonCheat = await r.json();
	document.getElementById('l2').innerText = "✔";
	r = await fetch("https://raw.githubusercontent.com/s-rv99/s-rv99.github.io/main/json/current.json",{method:"GET"});
	jsonSnapshot = await r.json();
	document.getElementById('l4').innerText = "✔";
	c = 0;
	total = 0;
	tots = 0;
	totc = 0;
	uids = []
	unms = []
	rss = []
	rcs = []
	dfs = []
	for(let p = 1; p <= pages; p++){
		r = await fetch("https://engine.freerice.com/group-members?_format=json&group=57a09e6b-505f-4192-95d5-d214e139fe9f&current=" + p + "&limit=50",{method:"GET"});
		jsonObj = await r.json();
		pages = jsonObj.meta.pagination.total_pages;
		document.getElementById('l3').innerText = p + "/" + pages;
		for(let i = 0; i < jsonObj.meta.pagination.count; i++){
			if(!jsonCheat.cheaters.includes(jsonObj.data[i].attributes.user) && !uids.includes(jsonObj.data[i].attributes.user)){
				try{
					diff = jsonObj.data[i].attributes.rice - jsonSnapshot.data[jsonObj.data[i].attributes.user].rice;
					totc = totc + jsonObj.data[i].attributes.rice;
					tots = tots + Number(jsonSnapshot.data[jsonObj.data[i].attributes.user].rice);
				}catch{
					diff = jsonObj.data[i].attributes.rice;
					totc = totc + jsonObj.data[i].attributes.rice;
				}
				if(diff > 0){
					try{
						rss.push(Number(jsonSnapshot.data[jsonObj.data[i].attributes.user].rice));
					}catch{
						rss.push(0);
					}
					dfs.push(diff)
					rcs.push(jsonObj.data[i].attributes.rice)
					uids.push(jsonObj.data[i].attributes.user);
					unms.push(assoc[jsonObj.data[i].attributes.user]);
					if(assoc[jsonObj.data[i].attributes.user] == "undefined"){
						console.log(jsonObj.data[i].attributes.user);
					}
					total += diff;
				}
			}
		}
	}
	row = footer.insertRow(0);
	cell1 = row.insertCell(0);
	cell1.style.backgroundColor  = "#E06666";
  	cell2 = row.insertCell(1);
  	cell2.style.backgroundColor  = "#F6B26B";
  	cell3 = row.insertCell(2);
  	cell3.style.backgroundColor  = "#FFD966";
  	cell4 = row.insertCell(3);
  	cell4.style.backgroundColor  = "#93C47D";
  	cell5 = row.insertCell(4);
  	cell5.style.backgroundColor  = "#6D9EEB";
  	cell6 = row.insertCell(5);
  	cell6.style.backgroundColor  = "#8E7CC3";
	cell3.innerText = tots;
	cell4.innerText = totc;
	cell5.innerText = total;
	cell6.innerText = "100%";
	document.getElementById('load').classList.add('hide');
	document.getElementById('tab').classList.remove('hide');
	document.getElementById('totr').innerText = total;
	console.log(unms)
	console.log(rss)
	console.log(rcs)
	console.log(dfs)
	l = dfs.length;
	newp = 0;
	for(i=0; i < l; i++){
		max = -1;
		for(ii=0; ii < dfs.length; ii++){
			if(dfs[ii] > max){
				max = dfs[ii];
			}
		}
		index = dfs.indexOf(max);
		row = table.insertRow(i);
		cell1 = row.insertCell(0);
		cell1.style.backgroundColor  = "#EA9999";
		cell1.innerText = i+1;
  		cell2 = row.insertCell(1);
  		cell2.style.backgroundColor  = "#F9CB9C";
		cell2.innerText = unms[index];
  		cell3 = row.insertCell(2);
  		cell3.style.backgroundColor  = "#FFE599";
		cell3.innerText = rss[index];
		if(rss[index] == 0){
			newp = newp + 1;
		}
  		cell4 = row.insertCell(3);
  		cell4.style.backgroundColor  = "#B6D7A8";
		cell4.innerText = rcs[index];
  		cell5 = row.insertCell(4);
  		cell5.style.backgroundColor  = "#A4C2F4";
		cell5.innerText = dfs[index];
  		cell6 = row.insertCell(5);
  		cell6.style.backgroundColor  = "#B4A7D6";
		cell6.innerText = (((dfs[index])/total)*100).toFixed(2) + " %";
		unms.splice(index,1);
		rss.splice(index,1);
		rcs.splice(index,1);
		dfs.splice(index,1);
	}
	document.getElementById('newp').innerText = newp;
	document.getElementById('totp').innerText = l;
}
loadData();