window.supabaseClient = window.supabase.createClient(supabaseUrl, publishKey);

// 1 - Category button functionalities (dummy function)
const categoriesButtonLogic = async (event) => {

    const courseSelected = event.target.innerText; 

    const { data, error } = await supabaseClient
        .from('categories')
        .select('id')
        .eq('name', courseSelected)
        .single();
    
    if (error) {
        console.error('Category not found:', error);
        return;
    }
    
    const category_id = data.id
    populateSubjects(category_id);

}

const populateSubjects = async (category_id) => {

    try {

        // Check if section already exists 
        const existingSection = document.querySelector('.subject-section');
        if (existingSection) {
            console.log('Subject section already exists!');
            return; // Exit the function early
        }

        // Query Supabase for subjects in the selected category
        const { data: subjects, error } = await supabaseClient
            .from('subjects')
            .select('name, img_src')
            .eq('category_id', category_id);

        if (error) {
            console.error('Error fetching subjects:', error);
            return;
        }

        // Construct the section
        const section = document.createElement('section');
        section.className = 'subject-section';
        
        const heading = document.createElement('h2');
        heading.textContent = `Select A Subject`;
        heading.style.textAlign = 'center';
        section.appendChild(heading);

        const subjectsGrid = document.createElement('div');
        subjectsGrid.className = 'subjects-grid';

        // Create subject buttons dynamically
        subjects.forEach(subject => {
            const subjectBtn = document.createElement('button');
            subjectBtn.className = 'subject-btn';
            subjectBtn.innerHTML = `
                <img src="${subject.img_src}">
                <p>${subject.name}</p>
            `;
            
            // Add click handler for individual subjects
            subjectBtn.addEventListener('click', () => {
                handleSubjectClick(subject.name);
            });

            subjectsGrid.appendChild(subjectBtn);
        });

        section.appendChild(subjectsGrid);

        // Attach it adjacent to the category section
        const categorySection = document.querySelector('.Category-section')
        categorySection.insertAdjacentElement('afterend', section);

        // Show the section
        const subjectSection = document.querySelector('.subject-section');
        subjectSection.style.display = 'block';

    } catch (error) {
        console.error('Error in populateSubjects:', error);
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