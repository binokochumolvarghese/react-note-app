import { useState } from "react";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Modal from "../UI/Modal";

export default function EditNotes({ props, closeModal, callFetchNotes }) {
 
  const [noteData, setNoteData] = useState({
    id: props.id,
    noteTitle: props.noteTitle,
    note: props.note,
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setNoteData((preNoteData) => {
      return { ...preNoteData, [name]: value };
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // To update the notes
    const notesDocRef = doc(db, "notes", props.id);

    try {
      await updateDoc(notesDocRef, {
        noteTitle: noteData.noteTitle,
        note: noteData.note,
      });

      callFetchNotes();

      closeModal.current.close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-yellow-50">
        <div className="bg-yellow-50 rounded-lg px-2 py-2 ring-1 ring-slate-900/5 shadow-sm ">
          <input
            type="text"
            className="bg-yellow-50 w-full focus-visible:border-0 font-semibold"
            id="noteTitle"
            name="noteTitle"
            value={noteData.noteTitle}
            onChange={onChangeHandler}
          />
          <br />
          <textarea
            className="bg-yellow-50 w-full focus-visible:border-0"
            id="note"
            name="note"
            rows="4"
            cols="50"
            value={noteData.note}
            onChange={onChangeHandler}
          />
          <br />
        </div>
        <div>
          <button
            className="mt-2 p-1 rounded bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 "
            type="submit"
            onClick={onSubmitHandler}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
