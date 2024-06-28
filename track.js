var obj = document.getElementById("emojicontainer")
obj.onmousemove = function(event){
    var tracks = document.createElement('div')  //create a new div
    var e = event || window.event  
    tracks.style.cssText = "position:absolute; width:5px; height:5px; background-color:black; border-radius:50%"   
    tracks.style.left = e.pageX + "px"
    tracks.style.top = e.pageY + "px"

    document.body.appendChild(tracks)

    // The track will disappear in 0.3 second
    setTimeout(function(){
        tracks.remove(); //
    },300);
}