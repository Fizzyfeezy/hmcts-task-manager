let editingTaskId = null;

document.getElementById('createTaskBtn').onclick = () => openModal();

async function loadTasks() {
    const res = await fetch('/tasks');
    const tasks = await res.json();
    const tbody = document.querySelector('#tasksTable tbody');
    tbody.innerHTML = '';

    tasks.forEach(task => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${task.id}</td>
      <td>${task.title}</td>
      <td class="status-${task.status}">${task.status}</td>
      <td>${task.dueDate ? task.dueDate.replace('T', ' ') : ''}</td>
      <td>
        <button onclick='viewTask(${JSON.stringify(task)})'>View</button>
        <button onclick='openModal(${JSON.stringify(task)})'>Edit</button>
        <button onclick='deleteTask(${JSON.stringify(task)})'>Delete</button>
      </td>
    `;
        tbody.appendChild(tr);
    });
}

function openModal(task = null) {
    const modal = document.getElementById('taskModal');
    modal.style.display = 'flex';

    if (task) {
        editingTaskId = task.id;
        document.getElementById('modalTitle').innerText = 'Edit Task';
        document.getElementById('modalTaskTitle').value = task.title;
        document.getElementById('modalTaskDescription').value = task.description || '';
        document.getElementById('modalTaskStatus').value = task.status;
        document.getElementById('modalTaskDueDate').value = task.dueDate ? task.dueDate.slice(0,16) : '';
        document.getElementById('deleteBtn').style.display = 'none';
    } else {
        editingTaskId = null;
        document.getElementById('modalTitle').innerText = 'Create Task';
        document.getElementById('modalTaskTitle').value = '';
        document.getElementById('modalTaskDescription').value = '';
        document.getElementById('modalTaskStatus').value = 'PENDING';
        document.getElementById('modalTaskDueDate').value = '';
        document.getElementById('deleteBtn').style.display = 'none';
    }
}

function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
}

document.getElementById('saveBtn').onclick = async () => {
    const taskData = {
        title: document.getElementById('modalTaskTitle').value,
        description: document.getElementById('modalTaskDescription').value,
        status: document.getElementById('modalTaskStatus').value,
        dueDate: document.getElementById('modalTaskDueDate').value
    };

    if (editingTaskId) {
        // Update Task
        await fetch(`/tasks/${editingTaskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: document.getElementById('modalTaskTitle').value,
                description: document.getElementById('modalTaskDescription').value,
                status: document.getElementById('modalTaskStatus').value, // send as string
                dueDate: document.getElementById('modalTaskDueDate').value
            })
        });
    } else {
        // Create Task
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: document.getElementById('modalTaskTitle').value,
                description: document.getElementById('modalTaskDescription').value,
                status: document.getElementById('modalTaskStatus').value,
                dueDate: document.getElementById('modalTaskDueDate').value
            })
        });
    }

    closeModal();
    await loadTasks();
};

// View Task
function viewTask(task) {
    document.getElementById("viewTitle").textContent = task.title;
    document.getElementById("viewDescription").textContent = task.description || "No description";
    document.getElementById("viewStatus").textContent = task.status;
    document.getElementById("viewDueDate").textContent = task.dueDate ? task.dueDate.replace('T', ' ') : "No due date";
    document.getElementById("viewModal").style.display = "flex";
}
function closeViewModal() {
    document.getElementById("viewModal").style.display = "none";
}

// Delete Task
document.getElementById('deleteBtn').onclick = async () => {
    if (!editingTaskId) return;
    await fetch(`/tasks/${editingTaskId}`, { method: 'DELETE' });
    closeModal();
    await loadTasks();
};

async function deleteTask(task) {
    if (!task || !task.id) return;

    if (!confirm(`Are you sure you want to delete "${task.title}"?`)) return;

    await fetch(`/tasks/${task.id}`, { method: 'DELETE' });
    await loadTasks();
}

// Load tasks initially
loadTasks();