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
    const categoryItemContainer = document.getElementById('category-item-container');
    categoryItemContainer.innerHTML = '';
    let sortOrder = -1;
    if(categories.length > 0) {
        categories.forEach(category => {
            if(category.sort_order >= sortOrder) {
                sortOrder = category.sort_order + 1;
            }
            if(!category.is_active) return;
            const btn = document.createElement('button');
            btn.innerHTML += '<img src="' + category.image_url + '" alt="Category Image">';
            btn.innerHTML += '<p> name: ' + category.name + '</p>';
            btn.innerHTML += '<p> description: ' + (category.description == null ? 'No description' : category.description) + '</p>';
            btn.innerHTML += '<p> sort order: ' + category.sort_order + '</p>';
            btn.innerHTML += '<p> active status: ' + category.is_active + '</p>';
            categoryItemContainer.appendChild(btn);
            btn.addEventListener('click', () => {
                const categoryItem = document.getElementById('category-item');
                categoryItem.style.display = 'block';
                categoryItem.innerHTML = '';
                const button = document.createElement('button');
                button.innerHTML += '<img src="' + categories.find(c => c.id == btn.value).image_url + '" alt="Category Image">';
                button.innerHTML += '<p>' + categories.find(c => c.id == btn.value).name + '</p>';
                categoryItem.appendChild(button);
                initializeAddSubjectButton(btn.value);
            });
        });
        document.getElementById('category-sort-order').value = sortOrder;
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
    document.getElementById('subject-category-id').value = categoryId;
    let sortOrder = -1;
    const subjects = await fetchSubjects(categoryId);
    const subjectSelectContainer = document.getElementById('subject-select');
    subjectSelectContainer.innerHTML = '<option>Select Subject</option>';
    if(subjects.length > 0) {
        subjects.forEach(subject => {
            if(subject.sort_order >= sortOrder) {
                sortOrder = subject.sort_order + 1;
            }
            if(!subject.is_active) return;
            const option = document.createElement('option');
            option.value = subject.id;
            option.textContent = subject.name;
            subjectSelectContainer.appendChild(option);
        });
        document.getElementById('subject-sort-order').value = sortOrder;
        subjectSelectContainer.addEventListener('change', () => {
            const subjectItem = document.getElementById('subject-item');
            subjectItem.style.display = 'block';
            subjectItem.innerHTML = '';
            const button = document.createElement('button');
            button.innerHTML += '<img src="' + subjects.find(s => s.id == subjectSelectContainer.value).image_url + '" alt="Subject Image">';
            button.innerHTML += '<p>' + subjects.find(s => s.id == subjectSelectContainer.value).name + '</p>';
            subjectItem.appendChild(button);
            const description = document.createElement('p');
            description.textContent = (subjects.find(s => s.id == subjectSelectContainer.value).description == null ? 'No description' : subjects.find(s => s.id == subjectSelectContainer.value).description);
            description.textContent += ' | Active Status: ' + (subjects.find(s => s.id == subjectSelectContainer.value).is_active == null ? 'No active status' : subjects.find(s => s.id == subjectSelectContainer.value).is_active);
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
    courseContainer.style.display = 'block';
    const courseSelectContainer = document.getElementById('course-select');
    courseSelectContainer.innerHTML = '<option>Select Course</option>';
    courses.forEach(course => {
        if(!course.is_active) return;
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = course.name;
        courseSelectContainer.appendChild(option);
    });
    courseSelectContainer.addEventListener('change', () => {
        const courseItem = document.getElementById('course-item');
        if(courseItem.style.display != 'block') {
            courseItem.style.display = 'block';
        }
        courseItem.innerHTML = '';
        const button = document.createElement('button');
        button.innerHTML += '<img src="' + courses.find(c => c.id == courseSelectContainer.value).image_url + '" alt="Course Image">';
        button.innerHTML += '<p>' + courses.find(c => c.id == courseSelectContainer.value).name + '</p>';
        courseItem.appendChild(button);
        const description = document.createElement('p');
        description.textContent = (courses.find(c => c.id == courseSelectContainer.value).description == null ? 'No description' : courses.find(c => c.id == courseSelectContainer.value).description);
        courseItem.appendChild(description);
        renderUnits(courseSelectContainer.value);
    });
}

async function fetchUnits(courseId) {
    const {data, error} = await window.supabaseClient.from('units').select('*').eq('course_id', courseId);
    if (error) {
        console.error(error);
        return [];
    } else {
        console.log(data);
        return data;
    }
}

async function renderUnits(courseId) {
    const units = await fetchUnits(courseId);
    const unitContainer = document.getElementById('unit-container');
    unitContainer.style.display = 'block';
    const unitSelectContainer = document.getElementById('unit-select');
    unitSelectContainer.innerHTML = '<option>Select Unit</option>';
    units.forEach(unit => {
        if(!unit.is_active) return;
        const option = document.createElement('option');
        option.value = unit.id;
        option.textContent = 'Unit ' + (unit.sort_order + 1) + ' - ' + unit.name;
        unitSelectContainer.appendChild(option);
    });
    unitSelectContainer.addEventListener('change', () => {
        const unitItem = document.getElementById('unit-item');
        if(unitItem.style.display != 'block') {
            unitItem.style.display = 'block';
        }
        unitItem.innerHTML = '';
        const button = document.createElement('button');
        button.innerHTML += '<p>' + units.find(u => u.id == unitSelectContainer.value).name + '</p>';
        unitItem.appendChild(button);
        const description = document.createElement('p');
        description.textContent = (units.find(u => u.id == unitSelectContainer.value).description == null ? 'No description' : units.find(u => u.id == unitSelectContainer.value).description);
        unitItem.appendChild(description);
        renderLessons(unitSelectContainer.value);
    });
}

async function fetchLessons(unitId) {
    const {data, error} = await window.supabaseClient.from('lessons').select('*').eq('unit_id', unitId);
    if (error) {
        console.error(error);
        return [];
    } else {
        console.log(data);
        return data;
    }
}

async function renderLessons(unitId) {
    const lessons = await fetchLessons(unitId);
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.style.display = 'block';
    const lessonSelectContainer = document.getElementById('lesson-select');
    lessonSelectContainer.innerHTML = '<option>Select Lesson</option>';
    lessons.forEach(lesson => {
        if(!lesson.is_active) return;
        const option = document.createElement('option');
        option.value = lesson.id;
        option.textContent = 'Lesson ' + (lesson.sort_order + 1) + ' - ' + lesson.name;
        lessonSelectContainer.appendChild(option);
    });
    lessonSelectContainer.addEventListener('change', () => {
        const lessonItem = document.getElementById('lesson-item');
        lessonItem.style.display = 'block';
        lessonItem.innerHTML = '';
        const button = document.createElement('button');
        button.innerHTML += '<p>' + lessons.find(l => l.id == lessonSelectContainer.value).name + '</p>';
        lessonItem.appendChild(button);
        renderContents(lessonSelectContainer.value);
    });
}

async function fetchContents(lessonId) {
    const {data, error} = await window.supabaseClient.from('contents').select('*').eq('lesson_id', lessonId);
    if (error) {
        console.error("Error fetching content: ", error);
        return [];
    } else {
        console.log(data);
        return data;
    }
}

async function renderContents(lessonId) {
    const content = await fetchContents(lessonId);
    const contentContainer = document.getElementById('content-container');
    contentContainer.style.display = 'block';
    const contentItemContainer = document.getElementById('content-item-container');
    contentItemContainer.innerHTML = '';
    const contentId = content[0].id;
    content.forEach(content => {
        if(!content.is_active) return;
        const paragraph = document.createElement('p');
        paragraph.textContent = content.name;
        contentItemContainer.appendChild(paragraph);
    });
    if(contentId) {
        renderQuestions(contentId);
    } else {
        console.log('No content found', contentId);
    }
}

async function fetchQuestions(contentId) {
    const {data, error} = await window.supabaseClient.from('questions').select('*').eq('content_id', contentId);
    if (error) {
        console.error("Error fetching questions: ", error);
        return [];
    } else {
        console.log(data);
        return data;
    }
}

async function renderQuestions(contentId) {
    const questions = await fetchQuestions(contentId);
    const questionContainer = document.getElementById('question-container');
    questionContainer.style.display = 'block';
    const questionItemContainer = document.getElementById('question-list');
    questionItemContainer.innerHTML = '';
    questions.forEach(question => {
        if(!question.is_active) return;
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Question ' + (question.sort_order + 1) + ': ' + question.prompt;
        questionItemContainer.appendChild(paragraph);
        const paragraph2 = document.createElement('p');
        paragraph2.textContent = 'Tokens: ' + question.tokens;
        questionItemContainer.appendChild(paragraph2);
        const paragraph3 = document.createElement('p');
        paragraph3.textContent = 'Answer: ' + question.answer;
        questionItemContainer.appendChild(paragraph3);
    });
}

const sb = window.supabaseClient;

async function insertCategoryData(table, values) {
    const { data, error } = await sb.from(table).insert(values).select('*').single();
    if(error) {
        throw error;
    }
    return data;
}

(function initializeAddCategoryButton(){
    const btn = document.getElementById('add-category-btn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
        try {
            const payload = {
                name: document.getElementById('category-name').value.trim(),
                description: document.getElementById('category-description').value.trim() || null,
                image_url: document.getElementById('category-image-url').value.trim(),
                sort_order: parseInt(document.getElementById('category-sort-order').value, 10) || 0,
                is_active: true
            };
            if (!payload.name) return alert('Category name is required');
            if (!payload.image_url) return alert('Category image is required');
            if (!payload.sort_order) return alert('Category sort order is required');
            const row = await insertCategoryData('categories', payload);
            console.log('Inserted', row);
            alert('Insert Success');
            document.getElementById('category-name').value = '';
            document.getElementById('category-description').value = '';
            document.getElementById('category-image-url').value = '';
            document.getElementById('category-sort-order').value = '';
            document.getElementById('category-select').value = '';
            document.getElementById('category-item').innerHTML = '';
            if(row) {
                renderCategories();
            } else {
                alert('Category Re-Render Failed');
            }

        } catch (e) {
            console.error(e); alert('Insert Failed');
        }
    });
})();

async function insertSubjectData(table, values) {
    const { data, error } = await sb.from(table).insert(values).select('*').single();
    if(error) {
        throw error;
    }
    return data;
}

function initializeAddSubjectButton(categoryId){
    const btn = document.getElementById('add-subject-btn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
        try {
            const payload = {
                category_id: document.getElementById('subject-category-id').value.trim(),
                name: document.getElementById('subject-name').value.trim(),
                description: document.getElementById('subject-description').value.trim() || null,
                image_url: document.getElementById('subject-image-url').value.trim(),
                sort_order: parseInt(document.getElementById('subject-sort-order').value, 10) || 0,
                is_active: true
            };
            if (!payload.name) return alert('Subject name is required');
            if (!payload.image_url) return alert('Subject image is required');
            if (!payload.sort_order) return alert('Subject sort order is required');
            const row = await insertSubjectData('subjects', payload);
            console.log('Inserted', row);
            alert('Insert Success');
            document.getElementById('subject-name').value = '';
            document.getElementById('subject-description').value = '';
            document.getElementById('subject-image-url').value = '';
            document.getElementById('subject-sort-order').value = '';
            document.getElementById('subject-select').value = '';
            document.getElementById('subject-item').innerHTML = '';
            if(row) {
                renderSubjects(categoryId);
            } else {
                alert('Subject Re-Render Failed');
            }
        } catch (e) {
            console.error(e); alert('Insert Failed');
        }
    });
};



renderCategories();