window.supabaseClient = window.supabase.createClient(supabaseUrl, publishKey);

const renderCategories = async () => {

    const { data: categories, error } = await supabaseClient
        .from('categories')
        .select('name')

    // Construct the section
    const section = document.createElement('section');
    section.className = 'category-section';
    
    const heading = document.createElement('h2');
    heading.textContent = `Select A Category`;
    heading.style.textAlign = 'center';
    heading.style.gap = '25px';
    section.appendChild(heading);

    const categoriesGrid = document.createElement('div');
    categoriesGrid.className = 'categories-grid';

    // Create subject buttons dynamically
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = 'category-btn';
        categoryBtn.innerHTML = `
            <img src="${category.img_src}">
            <p>${category.name}</p>
        `;
        
        // Add click handler for individual subjects
        categoryBtn.addEventListener('click', () => {
            categoriesButtonLogic(subject.name);
        });

        categoriesGrid.appendChild(categoryBtn);
    });

    section.appendChild(categoriesGrid);

    // Attach it adjacent to the category section
    const mainSection = document.querySelector('.main')
    mainSection.insertAdjacentElement('afterend', section);

    // Show the section
    const categorySection = document.querySelector('.category-section');
    categorySection.style.display = 'block';



}

// 1 - Category button functionalities (dummy function)
const categoriesButtonLogic = async (course_name) => { 
    
    const { data: category_id, error } = await supabaseClient
        .from('categories')
        .select('id')
        .eq('name', course_name);
    
    if(error) {
        console.log("Error returned from categoriesButtonLogic()")
        return
    }

    renderSubjects(category_id); 

}

const renderSubjects = async (category_id) => {

    try {

        // Check if section already exists 
        const existingSection = document.querySelector('.subject-section');
        if (existingSection) {
            console.log('Subject section already exists!');
            return; 
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
                subjectButtonLogic(subject.name);
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
const subjectButtonLogic = (subject_name) => {
   
    console.log(subject_name);
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

    // Render categories function 
    renderCategories();




    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            categoriesButtonLogic(event);
        });
    });

  
    document.querySelectorAll('.unit-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            lessonButtonLogic(event);
        });
    });
});