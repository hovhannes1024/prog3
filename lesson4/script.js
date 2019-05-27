function clickHandler(evt){
    if (evt){
        console.log(evt);
    }
}

var p = document.getElementById("pElement");
p.addEventListener("click", clickHandler);