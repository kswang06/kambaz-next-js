import { redirect } from "next/navigation";
import { courses } from "../database";

export default function Courses() {
  const firstCourseId = courses[0]?._id;
  redirect(`/courses/${firstCourseId}/home`);
}
