//import Image from "next/image";
import NavBar from "./component/NavBar";
import TaskManagerPage from "./content/task-manager/page"
import CreateGroupPage from "./component/task-management/create-group/page";
import SignupPage from "./auth/page";
import CourseRoadmap from "./content/course/page";


export default function Page() {
  return (
    <div>
      <CourseRoadmap />
    </div>
  );
}
