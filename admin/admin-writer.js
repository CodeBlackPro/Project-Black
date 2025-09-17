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