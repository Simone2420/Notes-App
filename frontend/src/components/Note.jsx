import React from 'react'
// Tailwind styles applied via className; removed custom CSS import
export default function Note({ note, onDelete, onEdit }) {
    const formatedCreationDate = new Date(note.created_at).toLocaleDateString("en-US");
    const formatedUpdateDate = new Date(note.updated_at).toLocaleDateString("en-US");
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow px-7 py-8 my-4 max-w-[950px] flex flex-col gap-3 text-[1.15rem]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{note.title}</h2>
            <p className="text-[1.15rem] text-gray-700 mb-2">{note.content}</p>
            <p className="text-sm text-gray-500">Created at: {formatedCreationDate}</p>
            <p className="text-sm text-gray-500">Last updated: {formatedUpdateDate}</p>
            <div className="mt-3">
                <button className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 text-base mr-2" onClick={() => onDelete(note.id)}>Delete</button>
                <button className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-base" onClick={() => onEdit(note.id, note.title, note.content)}>Edit</button>
            </div>
        </div>
    );
}
