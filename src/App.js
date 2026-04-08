import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import "./App.css";

const CARD_COLORS = ["#f9e060", "#f87090", "#60cfc0", "#b090e8"];

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const notesCollection = collection(db, "notes");

  const fetchNotes = async () => {
    const data = await getDocs(notesCollection);
    setNotes(data.docs.map((d) => ({ ...d.data(), id: d.id })));
  };

  const addNote = async () => {
    if (note.trim() === "") return;
    await addDoc(notesCollection, { text: note, createdAt: new Date() });
    setNote("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    fetchNotes();
  };

  const startEdit = (n) => {
    setEditingId(n.id);
    setEditText(n.text);
  };

  const saveEdit = async (id) => {
    if (editText.trim() === "") return;
    await updateDoc(doc(db, "notes", id), { text: editText });
    setEditingId(null);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <h1 className="title">✦ My Notes ✦</h1>
      <p className="subtitle">capture your thoughts, colorfully</p>

      <div className="input-row">
        <input
          type="text"
          placeholder="What's on your mind? ✏️"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
        />
        <button className="add-btn" onClick={addNote}>Add +</button>
      </div>

      <p className="count">{notes.length} note{notes.length !== 1 ? "s" : ""} 📝</p>

      <div className="grid">
        {notes.map((n, i) => (
          <div className="card" key={n.id} style={{ background: CARD_COLORS[i % 4] }}>
            {editingId === n.id ? (
              <>
                <textarea
                  className="edit-input"
                  rows={4}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="card-actions">
                  <button className="btn-save" onClick={() => saveEdit(n.id)}>Save</button>
                  <button className="btn-delete" onClick={() => deleteNote(n.id)}>🗑 Delete</button>
                </div>
              </>
            ) : (
              <>
                <p className="card-text" style={{ color: i % 4 === 1 ? "#fff" : "#333" }}>{n.text}</p>
                <div className="card-actions">
                  <button className="btn-edit" onClick={() => startEdit(n)}>✏️ Edit</button>
                  <button className="btn-delete" onClick={() => deleteNote(n.id)}>🗑 Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;