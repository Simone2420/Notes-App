import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import { Modal } from "../components/modal";
import { useNavigate } from "react-router-dom";
// Tailwind styles applied directly; removed custom CSS import
export default function Home() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editNoteId, setEditNoteId] = useState(0);
    const navigate = useNavigate();
    const getNote = () => {
        api
        .get("/api/notes/")
        .then((res) => res.data)
        .then((data) => {
            setNotes(data);
            console.log("Notes fetched successfully:", data);
        })
        .catch((error) => alert("An error occurred: " + error));
    };
    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) {
                console.log("Note deleted successfully");
                getNote()
            }
        }).catch((error) => {
            console.error("Error deleting note:", error);
            alert("An error occurred while deleting the note: " + error);
        });
    }
    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", { title, content })
        .then((res) => {
            if (res.status === 201) {
                console.log("Note created successfully:", res.data);
                getNote();
                setTitle("");
                setContent("");
            } else {
                alert("An error occurred while creating the note: " + res.status);
            }
        }).catch((error) => {
            console.error("Error creating note:", error);
            alert("An error occurred while creating the note: " + error);
        });
        
    }
    const editNote = (id, title, content) => {
        setEditNoteId(id);
        setTitle(title);
        setContent(content);
        setIsModalOpen(true);   
    }
    useEffect(() => {
        getNote();
    }, []);
    return (
        <div className="p-8 bg-gray-100 min-h-screen block w-full">
            <Modal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}} title="Edit Note">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    api.put(`/api/notes/edit/${editNoteId}/`, { title, content })
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("Note edited successfully:", res.data);
                            getNote();
                            setTitle("");
                            setContent("");
                            setIsModalOpen(false);
                        } else {
                            alert("An error occurred while editing the note: " + res.status);
                        }
                    }).catch((error) => {
                        console.error("Error editing note:", error);
                        alert("An error occurred while editing the note: " + error);
                    });
                }} className="flex flex-col gap-4">
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-base transition-colors bg-gray-50 focus:border-indigo-500 focus:outline-none focus:bg-white"
                        required
                    />
                    <br />
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        className="w-full min-h-[100px] resize-y px-4 py-3 border border-gray-300 rounded-md text-base transition-colors bg-gray-50 focus:border-indigo-500 focus:outline-none focus:bg-white"
                        required
                    />
                    <br />
                    <button type="submit" value="Submit" className="bg-indigo-500 text-white rounded-md px-6 py-3 text-base cursor-pointer transition-colors hover:bg-indigo-600">Save Changes</button>
                </form>

            </Modal>
            <br />
            <section className="flex flex-wrap justify-center gap-6 mt-8">
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} onEdit={editNote} key={note.id}/>
            ))}
            </section>
            <div>
                <h1 className="text-center text-2xl text-gray-800 mb-4 font-semibold">Notes</h1>
                <form onSubmit={createNote} className="bg-white p-8 rounded-xl shadow-md max-w-[400px] mx-auto flex flex-col gap-4">
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Title"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-base transition-colors bg-gray-50 focus:border-indigo-500 focus:outline-none focus:bg-white"
                        required
                    />
                    <br />
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="Content" 
                        className="w-full min-h-[100px] resize-y px-4 py-3 border border-gray-300 rounded-md text-base transition-colors bg-gray-50 focus:border-indigo-500 focus:outline-none focus:bg-white"
                        required
                    />
                    <br />
                    <button type="submit" value="Submit" className="bg-indigo-500 text-white rounded-md px-6 py-3 text-base cursor-pointer transition-colors hover:bg-indigo-600">Create Note</button>
                </form>
            </div>
            <button
                className="bg-red-500 text-white border-0 rounded-md px-6 py-3 text-base cursor-pointer transition-colors fixed top-4 right-4 hover:bg-red-600"
                onClick={() => {
                    navigate("/logout")
                }}
            >
                Logout
            </button>
        </div>
    );
}
