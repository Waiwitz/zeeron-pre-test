import { AddDataField } from "./components/add-data-field";
import { DataTable } from "./components/data-table";
import { useTest } from "./hooks/ีuseTest";

function App() {
  useTest()
  return (
    <div className="mx-5 my-20 md:mx-30">
      <DataTable />
      <AddDataField />
    </div>
  );
}

export default App;
