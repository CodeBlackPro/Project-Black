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
    let sortOrder = 0;
    if(categories.length >= 0) {
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
            btn.innerHTML += '<p> created at: ' + formatDate(category.created_at) + '</p>';
            btn.innerHTML += '<p> updated at: ' + formatDate(category.updated_at) + '</p>';
            categoryItemContainer.appendChild(btn);
            btn.addEventListener('click', () => {
                //show subjects within category
                renderSubjects(category.id);
                initializeAddSubjectButton(category.id);
            });
        });
        document.getElementById('category-sort-order').value = sortOrder;
    } else {
        categoryItemContainer.innerHTML = '<p>No categories found</p>';
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
    let sortOrder = 0;
    const subjects = await fetchSubjects(categoryId);
    const subjectItemContainer = document.getElementById('subject-item-container');
    subjectItemContainer.innerHTML = '';
    if(subjects.length >= 0) {
        subjects.forEach(subject => {
            if(subject.sort_order >= sortOrder) {
                sortOrder = subject.sort_order + 1;
            }
            if(!subject.is_active) return;
            const btn = document.createElement('button');
            btn.innerHTML += '<img src="' + subject.image_url + '" alt="Subject Image">';
            btn.innerHTML += '<p> name: ' + subject.name + '</p>';
            btn.innerHTML += '<p> description: ' + (subject.description == null ? 'No description' : subject.description) + '</p>';
            btn.innerHTML += '<p> sort order: ' + subject.sort_order + '</p>';
            btn.innerHTML += '<p> active status: ' + subject.is_active + '</p>';
            btn.innerHTML += '<p> created at: ' + formatDate(subject.created_at) + '</p>';
            btn.innerHTML += '<p> updated at: ' + formatDate(subject.updated_at) + '</p>';
            subjectItemContainer.appendChild(btn);
            btn.addEventListener('click', () => {
                //show courses within subject
                renderCourses(subject.id);
                initializeAddCourseButton(subject.id);
            });
        });
        document.getElementById('subject-sort-order').value = sortOrder;
    } else {
        subjectItemContainer.innerHTML = '<p>No subjects found</p>';
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
    const courseContainer = document.getElementById('course-container');
    courseContainer.style.display = 'block';
    document.getElementById('course-subject-id').value = subjectId;
    let sortOrder = 0;
    const courses = await fetchCourses(subjectId);
    const courseItemContainer = document.getElementById('course-item-container');
    courseItemContainer.innerHTML = '';
    if(courses.length >= 0) {
        courses.forEach(course => {
            if(course.sort_order >= sortOrder) {
                sortOrder = course.sort_order + 1;
            }
            if(!course.is_active) return;
            const btn = document.createElement('button');
            btn.innerHTML += '<img src="' + course.image_url + '" alt="Course Image">';
            btn.innerHTML += '<p> name: ' + course.name + '</p>';
            btn.innerHTML += '<p> description: ' + (course.description == null ? 'No description' : course.description) + '</p>';
            btn.innerHTML += '<p> sort order: ' + course.sort_order + '</p>';
            btn.innerHTML += '<p> active status: ' + course.is_active + '</p>';
            btn.innerHTML += '<p> created at: ' + formatDate(course.created_at) + '</p>';
            btn.innerHTML += '<p> updated at: ' + formatDate(course.updated_at) + '</p>';
            courseItemContainer.appendChild(btn);
            btn.addEventListener('click', () => {
                //show units within course
                renderUnits(course.id);
                initializeAddUnitButton(course.id);
            });
        });
        document.getElementById('course-sort-order').value = sortOrder;
    } else {
        courseItemContainer.innerHTML = '<p>No courses found</p>';
    }
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
    const unitContainer = document.getElementById('unit-container');
    unitContainer.style.display = 'block';
    document.getElementById('unit-course-id').value = courseId;
    let sortOrder = 0;
    const units = await fetchUnits(courseId);
    const unitItemContainer = document.getElementById('unit-item-container');
    unitItemContainer.innerHTML = '';
    if(units.length >= 0) {
        units.forEach(unit => {
            if(unit.sort_order >= sortOrder) {
                sortOrder = unit.sort_order + 1;
            }
            if(!unit.is_active) return;
            const btn = document.createElement('button');
            btn.innerHTML += '<p> name: ' + unit.name + '</p>';
            btn.innerHTML += '<p> description: ' + (unit.description == null ? 'No description' : unit.description) + '</p>';
            btn.innerHTML += '<p> sort order: ' + unit.sort_order + '</p>';
            btn.innerHTML += '<p> active status: ' + unit.is_active + '</p>';
            btn.innerHTML += '<p> created at: ' + formatDate(unit.created_at) + '</p>';
            btn.innerHTML += '<p> updated at: ' + formatDate(unit.updated_at) + '</p>';
            unitItemContainer.appendChild(btn);
            btn.addEventListener('click', () => {
                //show lessons within unit
                renderLessons(unit.id);
                initializeAddLessonButton(unit.id);
            });
        });
        document.getElementById('unit-sort-order').value = sortOrder;
    } else {
        unitItemContainer.innerHTML = '<p>No units found</p>';
    }
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
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.style.display = 'block';
    document.getElementById('lesson-unit-id').value = unitId;
    let sortOrder = 0;
    const lessons = await fetchLessons(unitId);
    const lessonItemContainer = document.getElementById('lesson-item-container');
    lessonItemContainer.innerHTML = '';
    if(lessons.length >= 0) {
        lessons.forEach(lesson => {
            if(lesson.sort_order >= sortOrder) {
                sortOrder = lesson.sort_order + 1;
            }
            if(!lesson.is_active) return;
            const btn = document.createElement('button');
            btn.innerHTML += '<p> name: ' + lesson.name + '</p>';
            btn.innerHTML += '<p> description: ' + (lesson.description == null ? 'No description' : lesson.description) + '</p>';
            btn.innerHTML += '<p> sort order: ' + lesson.sort_order + '</p>';
            btn.innerHTML += '<p> active status: ' + lesson.is_active + '</p>';
            btn.innerHTML += '<p> created at: ' + formatDate(lesson.created_at) + '</p>';
            btn.innerHTML += '<p> updated at: ' + formatDate(lesson.updated_at) + '</p>';
            lessonItemContainer.appendChild(btn);
            btn.addEventListener('click', () => {
                //show contents within lesson
                renderContents(lesson.id);
                initializeAddContentButton(lesson.id);
            });
        });
        document.getElementById('lesson-sort-order').value = sortOrder;
    } else {
        lessonItemContainer.innerHTML = '<p>No lessons found</p>';
    }
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
    const contentContainer = document.getElementById('content-container');
    contentContainer.style.display = 'block';
    document.getElementById('content-lesson-id').value = lessonId;
    let sortOrder = 0;
    const contents = await fetchContents(lessonId);
    const contentItemContainer = document.getElementById('content-item-container');
    contentItemContainer.innerHTML = '';
    if(contents.length >= 0) {
        contents.forEach(content => {
            if(content.sort_order >= sortOrder) {
                sortOrder = content.sort_order + 1;
            }
            if(!content.is_active) return;
            const btn = document.createElement('button');
            btn.innerHTML += '<p style="text-align: left;"> markdown content: ' + content.markdown_content + '</p><br>';
            btn.innerHTML += '<p> description: ' + (content.description == null ? 'No description' : content.description) + '</p>';
            btn.innerHTML += '<p> sort order: ' + content.sort_order + '</p>';
            btn.innerHTML += '<p> active status: ' + content.is_active + '</p>';
            btn.innerHTML += '<p> created at: ' + formatDate(content.created_at) + '</p>';
            btn.innerHTML += '<p> updated at: ' + formatDate(content.updated_at) + '</p>';
            contentItemContainer.appendChild(btn);
            btn.addEventListener('click', () => {
                //show questions within content
                renderQuestions(content.id);
                initializeAddQuestionButton(content.id);
            });
        });
        document.getElementById('content-sort-order').value = sortOrder;
    } else {
        contentItemContainer.innerHTML = '<p>No contents found</p>';
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
    const questionContainer = document.getElementById('question-container');
    questionContainer.style.display = 'block';
    document.getElementById('question-content-id').value = contentId;
    let sortOrder = 0;
    const questions = await fetchQuestions(contentId);
    const questionItemContainer = document.getElementById('question-item-container');
    questionItemContainer.innerHTML = '';
    if(questions.length >= 0) {
        questions.forEach(question => {
            if(question.sort_order >= sortOrder) {
                sortOrder = question.sort_order + 1;
            }
            if(!question.is_active) return;
            const btn = document.createElement('button');
            btn.innerHTML += '<p> prompt: ' + question.prompt + '</p>';
            btn.innerHTML += '<p> tokens: ' + question.tokens + '</p>';
            btn.innerHTML += '<p> answer: ' + question.answer + '</p>';
            btn.innerHTML += '<p> sort order: ' + question.sort_order + '</p>';
            btn.innerHTML += '<p> active status: ' + question.is_active + '</p>';
            btn.innerHTML += '<p> created at: ' + formatDate(question.created_at) + '</p>';
            btn.innerHTML += '<p> updated at: ' + formatDate(question.updated_at) + '</p>';
            questionItemContainer.appendChild(btn);
        });
        document.getElementById('question-sort-order').value = sortOrder;
    } else {
        questionItemContainer.innerHTML = '<p>No questions found</p>';
    }
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
    btn.onclick = async () => {
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
            if (!payload.sort_order === null || Number.isNaN(payload.sort_order)) return alert('Category sort order is required');
            const row = await insertCategoryData('categories', payload);
            console.log('Inserted', row);
            alert('Insert Success');
            document.getElementById('category-name').value = '';
            document.getElementById('category-description').value = '';
            document.getElementById('category-image-url').value = '';
            document.getElementById('category-sort-order').value = '';
            if(row) {
                renderCategories();
            } else {
                alert('Category Re-Render Failed');
            }

        } catch (e) {
            console.error(e); alert('Insert Failed');
        }
    };
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
    btn.onclick = async () => {
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
            if (!payload.sort_order === null || Number.isNaN(payload.sort_order)) return alert('Subject sort order is required');
            const row = await insertSubjectData('subjects', payload);
            console.log('Inserted', row);
            alert('Insert Success');
            document.getElementById('subject-name').value = '';
            document.getElementById('subject-description').value = '';
            document.getElementById('subject-image-url').value = '';
            document.getElementById('subject-sort-order').value = '';
            if(row) {
                renderSubjects(categoryId);
            } else {
                alert('Subject Re-Render Failed');
            }
        } catch (e) {
            console.error(e); alert('Insert Failed');
        }
    };
};

///insert course data
async function insertCourseData(table, values) {
    const { data, error } = await sb.from(table).insert(values).select('*').single();
    if(error) {
        throw error;
    }
    return data;
}

function initializeAddCourseButton(subjectId){
    const btn = document.getElementById('add-course-btn');
    if (!btn) return;
    btn.onclick = async () => {
        try {
            const payload = {
                subject_id: document.getElementById('course-subject-id').value.trim(),
                name: document.getElementById('course-name').value.trim(),
                description: document.getElementById('course-description').value.trim() || null,
                image_url: document.getElementById('course-image-url').value.trim(),
                sort_order: parseInt(document.getElementById('course-sort-order').value, 10) || 0,
                is_active: true
            };
            if (!payload.name) return alert('Course name is required');
            if (!payload.image_url) return alert('Course image is required');
            if (!payload.sort_order === null || Number.isNaN(payload.sort_order)) return alert('Course sort order is required');
            const row = await insertCourseData('courses', payload);
            console.log('Inserted', row);
            alert('Insert Success');
            document.getElementById('course-name').value = '';
            document.getElementById('course-description').value = '';
            document.getElementById('course-image-url').value = '';
            document.getElementById('course-sort-order').value = '';
            if(row) {
                renderCourses(subjectId);
            } else {
                alert('Course Re-Render Failed');
            }
        } catch (e) {
            console.error(e); alert('Insert Failed');
        }
    };
};

///insert unit data
async function insertUnitData(table, values) {
    const { data, error } = await sb.from(table).insert(values).select('*').single();
    if(error) {
        throw error;
    }
    return data;
}


function initializeAddUnitButton(courseId){
    const btn = document.getElementById('add-unit-btn');
    if (!btn) return;
    btn.onclick = async () => {
        try {
            const payload = {
                course_id: document.getElementById('unit-course-id').value.trim(),
                name: document.getElementById('unit-name').value.trim(),
                description: document.getElementById('unit-description').value.trim() || null,
                image_url: document.getElementById('unit-image-url').value.trim(),
                sort_order: parseInt(document.getElementById('unit-sort-order').value, 10) || 0,
                is_active: true
            };
            if (!payload.name) return alert('Unit name is required');
            if (!payload.image_url) return alert('Unit image is required');
            if (!payload.sort_order === null || Number.isNaN(payload.sort_order)) return alert('Unit sort order is required');
            const row = await insertUnitData('units', payload);
            console.log('Inserted', row);
            alert('Insert Success');
            document.getElementById('unit-name').value = '';
            document.getElementById('unit-description').value = '';
            document.getElementById('unit-image-url').value = '';
            document.getElementById('unit-sort-order').value = '';
            if(row) {
                renderUnits(courseId);
            } else {
                alert('Unit Re-Render Failed');
            }
        } catch (e) {
            console.error(e); alert('Insert Failed');
        }
    };
};

///insert lesson data
async function insertLessonData(table, values) {
    const { data, error } = await sb.from(table).insert(values).select('*').single();
    if(error) {
        throw error;
    }
    return data;
}


function initializeAddLessonButton(unitId){
    const btn = document.getElementById('add-lesson-btn');
    if (!btn) return;
    btn.onclick = async () => {
        try {
            const payload = {
                unit_id: document.getElementById('lesson-unit-id').value.trim(),
                name: document.getElementById('lesson-name').value.trim(),
                description: document.getElementById('lesson-description').value.trim() || null,
                image_url: document.getElementById('lesson-image-url').value.trim() || null,
                sort_order: parseInt(document.getElementById('lesson-sort-order').value, 10) || 0,
                is_active: true
            };
            if (!payload.name) return alert('Lesson name is required');
            if (!payload.image_url) return alert('Lesson image is required');
            if (!payload.sort_order === null || Number.isNaN(payload.sort_order)) return alert('Lesson sort order is required');
            const row = await insertLessonData('lessons', payload);
            console.log('Inserted', row);
            alert('Insert Success');
            document.getElementById('lesson-name').value = '';
            document.getElementById('lesson-description').value = '';
            document.getElementById('lesson-image-url').value = '';
            document.getElementById('lesson-sort-order').value = '';
            if(row) {
                renderLessons(unitId);
            } else {
                alert('Lesson Re-Render Failed');
            }
        } catch (e) {
            console.error(e); alert('Insert Failed');
        }
    };
};

//insert content data
async function insertContentData(table, values) {
    const { data, error } = await sb.from(table).insert(values).select('*').single();
    if(error) {
        throw error;   
    }
    return data;
}

function initializeAddContentButton(lessonId) {
    const btn = document.getElementById('add-content-btn');
    if(!btn) return;
    btn.onclick = async () => {
        try {
            const payload = {
                lesson_id: document.getElementById('content-lesson-id').value.trim(),
                markdown_content: document.getElementById('markdown-content').value.trim(),
                description: document.getElementById('content-description').value.trim() || null,
                sort_order: parseInt(document.getElementById('content-sort-order').value, 10) || 0,
                is_active: true
            };
            if (!payload.markdown_content) return alert('Content markdown content is required');
            if (!payload.sort_order === null || Number.isNaN(payload.sort_order)) return alert('Content sort order is required');
            const row = await insertContentData('contents', payload);
            console.log('Inserted', row);
            alert('Insert Success');
            document.getElementById('markdown-content').value = '';
            document.getElementById('content-description').value = '';
            document.getElementById('content-image-url').value = '';
            document.getElementById('content-sort-order').value = '';
            if(row) {
                renderContents(lessonId);
            } else {
                alert('Content Re-Render Failed');
            }
        } catch (e) {
            console.error(e); alert('Insert Failed');
        }
    };
}

async function insertQuestionData(table, values) {
    const { data, error } = await sb.from(table).insert(values).select('*').single();
    if(error) {
        throw error;
    }
    return data;
}

function initializeAddQuestionButton(contentId) {
    const btn = document.getElementById('add-question-btn');
    if(!btn) return;
    btn.onclick = async () => {
        try {
            const payload = {
                content_id: contentId,
                prompt: document.getElementById('question-prompt').value.trim(),
                tokens: document.getElementById('question-tokens').value.trim(),
                answer: document.getElementById('question-answer').value.trim(),
                sort_order: parseInt(document.getElementById('question-sort-order').value, 10) || 0,
                is_active: true
            };
            if (!payload.prompt) return alert('Question prompt is required');
            if (!payload.tokens) return alert('Question tokens are required');
            if (!payload.answer) return alert('Question answer is required');
            if (!payload.sort_order === null || Number.isNaN(payload.sort_order)) return alert('Question sort order is required');
            const row = await insertQuestionData('questions', payload);
            console.log('Inserted', row);
            alert('Insert Success');
            document.getElementById('question-prompt').value = '';
            document.getElementById('question-tokens').value = '';
            document.getElementById('question-answer').value = '';
            document.getElementById('question-sort-order').value = '';
            if(row) {
                renderQuestions(contentId);
            } else {
                alert('Question Re-Render Failed');
            }
        } catch (e) {
            console.error(e); alert('Insert Failed');
        }
    };
}

function formatDate(date) {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return 'Invalid Date';
    return new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    }).format(d);
}

renderCategories();