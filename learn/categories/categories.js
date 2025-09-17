window.supabaseClient = window.supabase.createClient(supabaseUrl, publishKey);
import { renderSubjects } from "../subjects/subjects.js";

const renderCategories = async () => {

    const { data: categories, error } = await supabaseClient
        .from('categories')
        .select('name, img_src') 
    
    const section = document.createElement('section');
    section.className = 'category-section';
   
    const heading = document.createElement('h2');
    heading.textContent = `Select A Category`;
    heading.style.textAlign = 'center';
    section.appendChild(heading);
    
    const categoriesGrid = document.createElement('div');
    categoriesGrid.className = 'categories-grid';
    categoriesGrid.style.display = 'flex';
    
    // Create subject buttons dynamically
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = 'category-btn';
        categoryBtn.innerHTML = `
            <img src="..${category.img_src}">
            <p>${category.name}</p>
        `;
       
        categoryBtn.addEventListener('click', () => {
            categoriesButtonLogic(category.name);
        });

        categoriesGrid.appendChild(categoryBtn);
    });
    
    section.appendChild(categoriesGrid);
    
    // Attach it adjacent to the category section
    const mainSection = document.querySelector('.main')
    mainSection.insertAdjacentElement('afterbegin', section);
    
    // Show the section
    const categorySection = document.querySelector('.category-section');
    categorySection.style.display = 'block';
}

// Category button functionalities
const categoriesButtonLogic = async (course_name) => {

    const { data: category_info, error } = await supabaseClient
        .from('categories')
        .select('id')
        .eq('name', course_name)
        .single();
   
    if(error) {
        console.log("Error returned from categoriesButtonLogic()")
        return
    }
    
    // Render subjects, logic in separate file (subjects.js)
    await renderSubjects(category_info.id);
}

// Render categories
document.addEventListener('DOMContentLoaded', function() { renderCategories(); });