//import Image from "next/image";
import NavBar from "./component/NavBar";
import TaskManagerPage from "./Pages/task-manager/TaskManagement"
import CreateGroupPage from "./component/task-management/create-group/MakeGroup";


export default function Page() {
  return (
    <div>
      <TaskManagerPage />
    </div>
  );
}
