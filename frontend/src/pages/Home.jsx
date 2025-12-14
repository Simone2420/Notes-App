import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
export default function Home() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
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
    useEffect(() => {
        getNote();
    }, []);
    return (
        <div className="home-container">
            <br />
            <section className="notes-container">
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id}/>
            ))}
            </section>
            <div>
                <h1 className="main-title">Notes</h1>
                <form onSubmit={createNote} className="note-form">
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Title"
                        className="note-title-input"
                        required
                    />
                    <br />
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="Content" 
                        className="note-content-input"
                        required
                    />
                    <br />
                    <button type="submit" value="Submit" className="create-note-button">Create Note</button>
                </form>
            </div>
            <button
                className="logout-button"
                onClick={() => {
                    navigate("/logout")
                }}
            >
                Logout
            </button>
        </div>
    );
}
