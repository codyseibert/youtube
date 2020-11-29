import "./App.css";
import { Suggestions } from "./Suggestions";

function App() {
  return (
    <div className="App">
      <Suggestions onSearch={(term) => console.log(term)} />
    </div>
  );
}

export default App;
