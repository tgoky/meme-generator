import './App.css';
import MemeGenerator from './components/MemeGenerator';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
    <MemeGenerator />
    </div>
    </DndProvider>
  );
}

export default App;
