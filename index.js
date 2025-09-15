// 1 - Add redirect for level-up-button
const levelUpButtonFunctionality = () => {
    // Perform a redirect to the learn.html page
    window.location.href = "./learn/learn.html"
}

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("level-up-button").addEventListener('click', function() {
        levelUpButtonFunctionality();
    });
});