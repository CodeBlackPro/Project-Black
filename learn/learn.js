// 1 - Category button functionalities (dummy function)
document.querySelector('.categories-grid').addEventListener('click', function(event) {
    if(event.target.innerText == "Programming") {
        console.log("Programming Clicked");
    } else if (event.target.innerText == "Art") {
        console.log("Art Clicked");
    } else if (event.target.innerText == "Video Editing") {
        console.log("Video Editing Clicked");
    } else if (event.target.innerText == "Fitness") {
        console.log("Fitness clicked");
    }
})