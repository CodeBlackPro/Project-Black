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
            loadCourses(subject.id);
        });
        subjectContainer.appendChild(subItem);
    });
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

async function loadCourses(subjectId) {
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

async function loadModules(courseId) {
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

async function loadLessons(moduleId) {
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
            console.log(lesson);
        });
        lessonContainer.appendChild(lessonItem);
    });
}

loadCategories();