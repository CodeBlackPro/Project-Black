// 1 - Category button functionalities (dummy function)
const categoriesButtonLogic = (event) => {
  
    const categoryActions = {
        "Programming": () => console.log("Programming Clicked"),
        "Art": () => console.log("Art Clicked"),
        "Video Editing": () => console.log("Video Editing Clicked"),
        "Fitness": () => console.log("Fitness clicked")
    };
    
    const action = categoryActions[event.target.innerText];
    if (action) {
        action();
    } else {
        console.log("Unknown category clicked");
    }
}

// 2 - Subject button functionalities (dummy function)
const subjectButtonLogic = (event) => {
   
    const subjectActions = {
        "HTML": () => console.log("HTML Subject Clicked"),
        "CSS": () => console.log("CSS Subject Clicked"),
        "JavaScript": () => console.log("JavaScript Subject Clicked"),
        "Python": () => console.log("Python Subject Clicked")
    };

    const action = subjectActions[event.target.innerText];
    if (action) {
        action();
    } else {
        console.log("Unknown subject clicked");
    }
}

// 3 - Lesson button functionalities (dummy function)

const lessonButtonLogic = (event) => {

    const lessonActions = {}
    for(let i = 1; i < 11; i++) {
        lessonActions[`Lesson ${i}`] = () => console.log(`Lesson ${i} button clicked`);
    }

    // Show the modal
    const action = lessonActions[event.target.innerText]
    if(action) {
        action();
    } else {
        console.log("Unknown lesson clicked");
    }
}

// When all the HTML loads
document.addEventListener('DOMContentLoaded', function() {


    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            categoriesButtonLogic(event);
        });
    });

    document.querySelectorAll('.subject-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            subjectButtonLogic(event);
        });
    });

    document.querySelectorAll('.unit-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            lessonButtonLogic(event);
        });
    });
});