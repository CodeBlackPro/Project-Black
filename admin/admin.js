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

async function renderCategories() {
    const categories = await fetchCategories();
    const categorySelectContainer = document.getElementById('category-select');
    categorySelectContainer.innerHTML = '<option>Select Category</option>';
    if(categories.length > 0) {
        categories.forEach(category => {
            if(!category.is_active) return;
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name + ' | ' + (category.description == null ? 'No description' : category.description);
            categorySelectContainer.appendChild(option);
        });
        categorySelectContainer.addEventListener('change', () => {
            const categoryItem = document.getElementById('category-item');
            categoryItem.style.display = 'block';
            categoryItem.innerHTML = '';
            const button = document.createElement('button');
            button.innerHTML += '<img src="' + categories.find(c => c.id == categorySelectContainer.value).image + '" alt="Category Image">';
            button.innerHTML += '<p>' + categories.find(c => c.id == categorySelectContainer.value).name + '</p>';
            categoryItem.appendChild(button);
            const description = document.createElement('p');
            description.textContent = (categories.find(c => c.id == categorySelectContainer.value).description == null ? 'No description' : categories.find(c => c.id == categorySelectContainer.value).description);
            categoryItem.appendChild(description);
            renderSubjects(categorySelectContainer.value);
        });
    } else {
        categorySelectContainer.innerHTML = '<option>No categories found</option>';
    }
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

async function renderSubjects(categoryId) {
    const subjectContainer = document.getElementById('subject-container');
    subjectContainer.style.display = 'block';
    const subjects = await fetchSubjects(categoryId);
    const subjectSelectContainer = document.getElementById('subject-select');
    subjectSelectContainer.innerHTML = '<option>Select Subject</option>';
    if(subjects.length > 0) {
        subjects.forEach(subject => {
            if(!subject.is_active) return;
            const option = document.createElement('option');
            option.value = subject.id;
            option.textContent = subject.name;
            subjectSelectContainer.appendChild(option);
        });
        subjectSelectContainer.addEventListener('change', () => {
            const subjectItem = document.getElementById('subject-item');
            subjectItem.style.display = 'block';
            subjectItem.innerHTML = '';
            const button = document.createElement('button');
            button.innerHTML += '<img src="' + subjects.find(s => s.id == subjectSelectContainer.value).image + '" alt="Subject Image">';
            button.innerHTML += '<p>' + subjects.find(s => s.id == subjectSelectContainer.value).name + '</p>';
            subjectItem.appendChild(button);
            const description = document.createElement('p');
            description.textContent = (subjects.find(s => s.id == subjectSelectContainer.value).description == null ? 'No description' : subjects.find(s => s.id == subjectSelectContainer.value).description);
            subjectItem.appendChild(description);
            renderCourses(subjectSelectContainer.value);
        });
    } else {
        subjectSelectContainer.innerHTML = '<option>No subjects found</option>';
    }
}

async function fetchCourses(subjectId) {
    const {data, error} = await window.supabaseClient.from('courses').select('*').eq('subject_id', subjectId);
    if (error) {
        console.error(error);
        return [];
    } else {
        console.log(data);
        return data;
    }
}

async function renderCourses(subjectId) {
    const courses = await fetchCourses(subjectId);
    const courseContainer = document.getElementById('course-container');
    courseContainer.innerHTML = '';
    courses.forEach(course => {
        const courseItem = document.createElement('div');
        if(course.name) {
            const courseTitle = document.createElement('h5');
            courseTitle.textContent = course.name;
            courseItem.appendChild(courseTitle);
        }
        if(course.description) {
            const courseDescription = document.createElement('p');
            courseDescription.textContent = course.description;
            courseItem.appendChild(courseDescription);
        }
        courseItem.classList.add('course-item');
        courseItem.addEventListener('click', () => {
            loadModules(course.id);
        });
        courseContainer.appendChild(courseItem);
    });
}

async function fetchModules(courseId) {
    const {data, error} = await window.supabaseClient.from('modules').select('*').eq('course_id', courseId);
    if (error) {
        console.error(error);
        return [];
    } else {
        console.log(data);
        return data;
    }
}

async function renderModules(courseId) {
    const modules = await fetchModules(courseId);
    const moduleContainer = document.getElementById('module-container');
    moduleContainer.innerHTML = '';
    modules.forEach(module => {
        const moduleItem = document.createElement('div');
        if(module.name) {
            const moduleTitle = document.createElement('h5');
            moduleTitle.textContent = module.name;
            moduleItem.appendChild(moduleTitle);
        }
        if(module.description) {
            const moduleDescription = document.createElement('p');
            moduleDescription.textContent = module.description;
            moduleItem.appendChild(moduleDescription);
        }
        moduleItem.classList.add('module-item');
        moduleItem.addEventListener('click', () => {
            loadLessons(module.id);
        });
        moduleContainer.appendChild(moduleItem);
    });
}

async function fetchLessons(moduleId) {
    const {data, error} = await window.supabaseClient.from('lessons').select('*').eq('module_id', moduleId);
    if (error) {
        console.error(error);
        return [];
    } else {
        console.log(data);
        return data;
    }
}

async function renderLessons(moduleId) {
    const lessons = await fetchLessons(moduleId);
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = '';
    lessons.forEach(lesson => {
        const lessonItem = document.createElement('div');
        if(lesson.name) {
            const lessonTitle = document.createElement('h5');
            lessonTitle.textContent = lesson.name;
            lessonItem.appendChild(lessonTitle);
        }
        if(lesson.description) {
            const lessonDescription = document.createElement('p');
            lessonDescription.textContent = lesson.description;
            lessonItem.appendChild(lessonDescription);
        }
        lessonItem.classList.add('lesson-item');
        lessonItem.addEventListener('click', () => {
            loadContent(lesson.id);
        });
        lessonContainer.appendChild(lessonItem);
    });
}

async function fetchContent(lessonId) {
    const {data, error} = await window.supabaseClient.from('contents').select('*').eq('lesson_id', lessonId);
    if (error) {
        console.error(error);
        return [];
    } else {
        console.log(data);
        return data;
    }
}

async function renderContent(lessonId) {
    const content = await fetchContent(lessonId);
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = '';
    content.forEach(content => {
        const contentItem = document.createElement('p');
        contentItem.classList.add('content-item');
        contentItem.textContent = content.content;
        contentContainer.appendChild(contentItem);
    });
}

renderCategories();