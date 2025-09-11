window.supabaseClient = window.supabase.createClient(supabaseUrl, publishKey);

async function fetchCategories() {
    const {data, error} = await window.supabaseClient.from('categories').select('*');
    if (error) {
        console.error(error);
        return [];
    } else {
        console.log(data);
        return data;
    }
}

async function loadCategories() {
    const categories = await fetchCategories();
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';
    categories.forEach(category => {
        const catItem = document.createElement('div');
        if(category.name){
            const catTitle = document.createElement('h5');
            catTitle.textContent = category.name;
            catItem.appendChild(catTitle);
        }
        if(category.description){
        const catDescription = document.createElement('p');
            catDescription.textContent = category.description;
            catItem.appendChild(catDescription);
        }
        catItem.classList.add('category-item');
        catItem.addEventListener('click', () => {
            loadSubjects(category.id);
        });
        categoryContainer.appendChild(catItem);
    });
}

async function fetchSubjects(categoryId) {
    const {data, error} = await window.supabaseClient.from('subjects').select('*').eq('category_id', categoryId);
    if (error) {
        console.error(error);
        return [];
    } else {
        console.log(data);
        return data;
    }
}

async function loadSubjects(categoryId) {
    const subjects = await fetchSubjects(categoryId);
    const subjectContainer = document.getElementById('subject-container');
    subjectContainer.innerHTML = '';
    subjects.forEach(subject => {
        const subItem = document.createElement('div');
        if(subject.name) {
            const subTitle = document.createElement('h5');
            subTitle.textContent = subject.name;
            subItem.appendChild(subTitle);
        }
        if(subject.description) {
            const subDescription = document.createElement('p');
            subDescription.textContent = subject.description;
            subItem.appendChild(subDescription);
        }
        subItem.classList.add('subject-item');
        subItem.addEventListener('click', () => {
            console.log(subject);
        });
        subjectContainer.appendChild(subItem);
    });
}

loadCategories();