async function getBalance(){
    result = await fetch("https://api.spyglass.pw/banano/v1/account/overview/ban_1ricex9kie3if1qros9s84joa6hnqd97nqc9fo58ca4ro3b1hnpyujjixoyt",{method:"GET"});
    jsonObj = await result.json();
    document.getElementById('balance').innerText = jsonObj.balance.toFixed(2);
}
getBalance();