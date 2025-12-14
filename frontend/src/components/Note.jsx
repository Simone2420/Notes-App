import React from 'react'
import '../styles/Note.css'
export default function Note({ note, onDelete }) {
    const formatedCreationDate = new Date(note.created_at).toLocaleDateString("en-US");
    const formatedUpdateDate = new Date(note.updated_at).toLocaleDateString("en-US");
    return (
        <div className='note-container'>
            <h2 className='note-title'>{note.title}</h2>
            <p className='note-content'>{note.content}</p>
            <p className='note-date'>Created at: {formatedCreationDate}</p>
            <p className='note-updated-at'>Last updated: {formatedUpdateDate}</p>
            <button className='note-delete-button' onClick={() => onDelete(note.id)}>Delete</button>
            <button className='note-edit-button'>Edit</button>
        </div>
    );
}
