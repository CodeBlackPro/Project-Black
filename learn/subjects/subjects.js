export const renderSubjects = async (category_id) => {

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
        subjectsGrid.style.display = 'flex';

        // Create subject buttons dynamically
        subjects.forEach(subject => {
            const subjectBtn = document.createElement('button');
            subjectBtn.className = 'subject-btn';
            subjectBtn.innerHTML = `
                <img src="..${subject.img_src}">
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
        const categorySection = document.querySelector('.category-section')
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
