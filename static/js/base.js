/* popup */
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('studentModal');
    const openModalBtn = document.getElementById('openModal');
    const closeModal = document.querySelector('.close');
    const form = document.getElementById('studentForm');
    const studentList = document.getElementById('student-list');

    function fetchStudents() {
        fetch('/api/students/')
            .then(response => response.json())
            .then(data => {
                studentList.innerHTML = '';
                data.forEach(student => {
                    const li = document.createElement('li');
                    li.textContent = student.name;
                    studentList.appendChild(li);
                });
            });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('studentName').value;

        fetch('/api/students/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
        .then(() => {
            modal.style.display = 'none';
            form.reset();
            fetchStudents();
        });
    });

    openModalBtn.onclick = () => modal.style.display = 'flex';
    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; }

    fetchStudents();
});


const studentId = window.location.pathname.split('/').filter(Boolean).pop();
const nameEl = document.getElementById('student-name');
const gradesList = document.getElementById('grades-list');
const subjectSelect = document.getElementById('subjectSelect');
const gradeForm = document.getElementById('gradeForm');

const editModal = document.getElementById('editModal');
const editBtn = document.getElementById('editStudentBtn');
const deleteBtn = document.getElementById('deleteStudentBtn');
const editForm = document.getElementById('editForm');
const editInput = document.getElementById('editNameInput');
const closeEdit = document.getElementById('closeEdit');

function fetchStudent() {
    fetch(`/api/students/${studentId}/`)
        .then(res => res.json())
        .then(data => {
            nameEl.textContent = data.name;
            editInput.value = data.name;
        });
}

function fetchGrades() {
    fetch('/api/grades/')
        .then(res => res.json())
        .then(data => {
            gradesList.innerHTML = '';
            data.filter(g => g.student === parseInt(studentId)).forEach(g => {
                const li = document.createElement('li');
                li.textContent = `${g.subject} - ${g.grade_type}: ${g.score}`;
                gradesList.appendChild(li);
            });
        });
}

function fetchSubjects() {
    fetch('/api/subjects/')
        .then(res => res.json())
        .then(data => {
            subjectSelect.innerHTML = '';
            data.forEach(sub => {
                const opt = document.createElement('option');
                opt.value = sub.id;
                opt.textContent = sub.name;
                subjectSelect.appendChild(opt);
            });
        });
}

gradeForm.addEventListener('submit', e => {
    e.preventDefault();
    fetch('/api/grades/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            student: studentId,
            subject: subjectSelect.value,
            grade_type: document.getElementById('gradeType').value,
            score: document.getElementById('scoreInput').value
        })
    }).then(() => {
        fetchGrades();
        gradeForm.reset();
    });
});

editBtn.onclick = () => editModal.style.display = 'flex';
closeEdit.onclick = () => editModal.style.display = 'none';

editForm.onsubmit = e => {
    e.preventDefault();
    fetch(`/api/students/${studentId}/`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: editInput.value})
    }).then(() => {
        fetchStudent();
        editModal.style.display = 'none';
    });
};

deleteBtn.onclick = () => {
    if (confirm('Are you sure?')) {
        fetch(`/api/students/${studentId}/`, { method: 'DELETE' })
            .then(() => window.location.href = '/students/');
    }
};

let editingGradeId = null;

function openEditGrade(id, type, score) {
    editingGradeId = id;
    document.getElementById('editGradeType').value = type;
    document.getElementById('editGradeScore').value = score;
    document.getElementById('editGradeModal').style.display = 'flex';
}

function deleteGrade(id) {
    if (confirm('Delete this grade?')) {
        fetch(`/api/grades/${id}/`, { method: 'DELETE' })
            .then(() => fetchGrades());
    }
}

document.getElementById('editGradeForm').onsubmit = e => {
    e.preventDefault();
    fetch(`/api/grades/${editingGradeId}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grade_type: document.getElementById('editGradeType').value,
            score: document.getElementById('editGradeScore').value
        })
    }).then(() => {
        document.getElementById('editGradeModal').style.display = 'none';
        fetchGrades();
    });
};

document.getElementById('closeGradeEdit').onclick = () => {
    document.getElementById('editGradeModal').style.display = 'none';
};

fetchStudent();
fetchGrades();
fetchSubjects();