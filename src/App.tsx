import SelectionPopup from "components/selection-popup";
import Root from "./routes/root";

function App() {
  return (
    <div className="container" data-tauri-drag-region>
      <Root />
      <SelectionPopup />
    </div>
  );
}

export default App;
