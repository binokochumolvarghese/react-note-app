import Footer from "./components/UI/Footer";
import Header from "./components/UI/Header";
import AddNotes from "./components/notes/AddNotes";
import NotesManager from "./components/notes/NotesManager";
import "./App.css";

function App() {
  return (
    <>
      <div className="bodyComponent">
        <Header />
        <AddNotes />
        <NotesManager />
      </div>
      <Footer />
    </>
  );
}

export default App;
