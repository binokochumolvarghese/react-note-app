import { useState, useEffect,Suspense, lazy } from "react";
import { db } from "../firebase/firebase";
import {  collection,  query,  orderBy,  onSnapshot,  QuerySnapshot, } from "firebase/firestore";
import Loading from "../UI/Loading";

const Note = lazy(() => import ("./Note"));

const NotesManager = () => {
  const [noteData, setNoteData] = useState([
    { id: "", noteTitle: "", note: "" },
  ]);

  const fetchNotes = () => {    
    setNoteData([]);
    const q = query(collection(db, "notes"), orderBy("created", "desc"));

    onSnapshot(q, (querySnapshot) => {
      setNoteData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          noteTitle: doc.data().noteTitle,
          note: doc.data().note,
        }))
      );
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
     <Suspense fallback={<Loading />}>
      <div className="container mx-auto px-4">
        <div className="grid grid-flow-row gap-4 md:grid-cols-3 sm:grid-cols-1 ">
          {noteData.map((note) => {
            return (
              <Note
                key={note.id}
                props={{
                  id: note.id,
                  noteTitle: note.noteTitle,
                  note: note.note,
                  callFetchNotes: fetchNotes
                }}
                
              />
            );
          })}
        </div>
      </div>
      </Suspense>
    </>
  );
};

export default NotesManager;
