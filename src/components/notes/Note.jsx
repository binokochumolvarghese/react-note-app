import { db } from "../firebase/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import EditNote from "./EditNote";
import Modal from "../UI/Modal";

const Note = ({ props }) => {
  const modal = useRef();

  const [noteData, setNoteData] = useState({
    id: props.id,
    noteTitle: props.noteTitle,
    note: props.note,
  });

  const onEditHandler = () => {
    modal.current.open();
  };

  const onDeleteHandler = async (props) => {
    const noteDocRef = doc(db, "notes", props.id);
    try {
      await deleteDoc(noteDocRef);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-yellow-50 rounded-lg px-4 py-4 ring-1 ring-slate-900/5 shadow-sm">
        <form key={props.id} className="w-full">
          <input
            type="text"
            className="w-full bg-yellow-50 font-semibold"
            disabled={true}
            id="noteTitle"
            name="noteTitle"
            defaultValue={noteData.noteTitle}
          />
          <br />
          <textarea
            className="w-full bg-yellow-50 h-50"
            disabled={true}
            id="note"
            name="note"
            defaultValue={noteData.note}
            rows="2"
            cols="50"
          />
          <br />
          <div className="flex justify-end">
            <button
              type="button"
              color="secondary"
              className="mr-1 p-1 rounded bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 "
              onClick={ onEditHandler }
            >
              Edit
            </button>
            <button
              type="button"
              color="secondary"
              className="mr-1 p-1 rounded bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 "
              onClick={() => {
                onDeleteHandler({ id: props.id });
              }}
            >
              Delete{" "}
            </button>
            <br /> 
          </div>
        </form>
      </div>

      { (
        <Modal ref={modal} headerTitle={"Edit Note"} btnCaption={"Close"}>
          <EditNote closeModal={modal} callFetchNotes={props.callFetchNotes}
            props={{
              id: noteData.id,
              noteTitle: noteData.noteTitle,
              note: noteData.note,
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Note;
