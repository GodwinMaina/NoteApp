
const getForm = document.getElementById('noteForm') as HTMLFormElement | null;

const heading = document.getElementById('heading') as HTMLInputElement;

const about = document.getElementById('about') as HTMLInputElement;


interface NoteBook{
    id:number,
    heading:string,
    about:string
}

const NoteArray:NoteBook[] = [];

//display created notes
function displayNote() {
    const noteCan = document.querySelector('.notesCont') as HTMLDivElement;

    let displayNotes= JSON.parse(localStorage.getItem('NOTES') || '[]');
    noteCan.innerHTML = '';

    displayNotes.forEach((note: NoteBook) => {
        const notePost = document.createElement('div');

        notePost.innerHTML = 
        `
       <div class="noteContainer">

       <h2>NOTE ${note.id}</h2>
       <!-- Your main page -->

    <a href="notePage.html?id=${note.id}" target="_blank">Click Me</a>
      
            <h3>Title:${note.heading}</h3>
            <h3>About:${note.about}</h3>

            <div>
            <button class="edit-btn" onclick="editNote(${note.id})">Edit</button>
            <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
            </div>

            </div> 
            `;

        noteCan.appendChild(notePost);
    });
}

document.addEventListener('DOMContentLoaded',function(){
    displayNote()
})

//Form
if (getForm) {
    getForm.addEventListener('submit', (e) => {
        e.preventDefault();
        //check existing note 1st
        const exist = JSON.parse(localStorage.getItem('NOTES') || '[]') as NoteBook[];
        const Note = heading.value.trim() !== "" && about.value.trim() !== "";

        if (Note) {
            //creating a new note
            const newNote = {
                id: exist.length + 1,
                heading: heading.value.trim(),
                about: about.value.trim()
            };

            exist.push(newNote);
            localStorage.setItem('NOTES', JSON.stringify(exist));

            heading.value = '';
            about.value = '';
            displayNote();
        }
    });
}

//general update function
function update(NoteArray: NoteBook[]) {
    localStorage.setItem('NOTES', JSON.stringify(NoteArray));
}


//DELETE FUNCTION
function deleteNote(id: number) {
    let displayNotes: NoteBook[] = JSON.parse(localStorage.getItem('NOTES') || '[]');
    //findIndex intresting array method  to splice
    const index = displayNotes.findIndex((note) => note.id === id);

    if (index !== -1) {

        const confirmDelete = confirm('Are you sure ABOUT DELETING this note?');
        if (confirmDelete) {
            displayNotes.splice(index, 1);
            update(displayNotes);
            displayNote();
        }
    }
};


//EDIT FUNCTION
function editNote(id: number) {
    let displayNotes: NoteBook[] = JSON.parse(localStorage.getItem('NOTES') || '[]') as NoteBook[];

    const index = displayNotes.findIndex((note) => note.id === id);
    if (index !== -1) {
        const editedNote = displayNotes.splice(index, 1)[0];
        localStorage.setItem('NOTES', JSON.stringify(displayNotes));

        update(displayNotes);
        displayNote();

        heading.value = editedNote.heading || '';
        about.value = editedNote.about || '';
    }
}



// singleNote.html page per id
document.addEventListener('DOMContentLoaded', function () {

    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('id');

    if (noteId !== null) {

        const allNotes = JSON.parse(localStorage.getItem('NOTES') || '[]') as NoteBook[];
        const noted = allNotes.find(note => note.id.toString() === noteId);

        if (noted) {
            const singleNote = document.getElementById('singleNote') as HTMLElement | null;

            if (singleNote) {

                singleNote.innerHTML = `
                <div class="noteContainerId">
                <h3>NOTE ${noted.id}</h3>
                    <h3>Title: ${noted.heading}</h3>
                    <h3>About: ${noted.about}</h3>
                </div>    
                `;
            } 
        }}});


