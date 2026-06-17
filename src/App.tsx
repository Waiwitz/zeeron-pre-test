import { AddDataField } from "./components/add-data-field";
import { DataTable } from "./components/data-table";

function App() {
  return (
    <div className="mx-5 my-20 md:mx-30">
      <DataTable />
      <AddDataField />
    </div>
  );
}

export default App;
