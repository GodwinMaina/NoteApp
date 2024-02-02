
const getForm = document.getElementById('noteForm') as HTMLFormElement | null;

const heading = document.getElementById('heading') as HTMLInputElement;

const about = document.getElementById('about') as HTMLInputElement;


interface NoteBook{
    id:number,
    heading:string,
    about:string
}

const NoteArray:NoteBook[] = [];


function displayNote() {
    const noteCan = document.querySelector('.notes-container') as HTMLDivElement;

    let displayNotes: NoteBook[] = JSON.parse(localStorage.getItem('NOTES') || '[]');

    noteCan.innerHTML = '';

    displayNotes.forEach((note: NoteBook) => {
        const notePost = document.createElement('div');

        notePost.innerHTML = `
            <h3>${note.heading}</h3>
            <p>About: ${note.about}</p>
            <button class="edit-btn" onclick="editNote(${note.id})">Edit</button>
            <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
        `;

        noteCan.appendChild(notePost);
    });
}


displayNote();


if(getForm){

    getForm.addEventListener('submit',(e)=>{
        e.preventDefault();
    
        const Note = heading.value.trim() !== "" && about.value.trim() !== "" ;
    
        if(Note){

        const newNote = {
                id: NoteArray.length + 1,
                heading: heading.value.trim(),
                about:about.value.trim()
               
            };
            NoteArray.push(newNote)
        }

        localStorage.setItem('NOTES',JSON.stringify(NoteArray));

        heading.value = '';
        about.value = '';
        displayNote();
       
    })
}


function update(notes: NoteBook[]) {

    localStorage.setItem('NOTES', JSON.stringify(notes));
}

function deleteNote(id: number) {
    let displayNotes: NoteBook[] = JSON.parse(localStorage.getItem('NOTES') || '[]');
    const index = displayNotes.findIndex((note) => note.id === id);

    if (index !== -1) {
        const confirmDelete = confirm('Are you sure you want to delete this note?');

        if (confirmDelete) {
            displayNotes.splice(index, 1);
            update(displayNotes);
            displayNote();
        }
    }
}
function editNote(id: number) {
    let displayNotes: NoteBook[] = JSON.parse(localStorage.getItem('NOTES') || '[]');

    if (id >= 0 && id < displayNotes.length) {
        const editedNote = displayNotes.splice(id, 1)[0];
        localStorage.setItem('NOTES', JSON.stringify(displayNotes));

        // update(displayNotes)
        displayNote();

        const headingInput = document.getElementById('heading') as HTMLInputElement;
        const aboutInput = document.getElementById('about') as HTMLInputElement;
        headingInput.value = editedNote.heading || '';
        aboutInput.value = editedNote.about || '';
    }
}

    