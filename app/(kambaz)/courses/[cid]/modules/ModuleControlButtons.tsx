import { BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
  return (
    <span className="float-end">
      <GreenCheckmark />
      <BsPlus className="ms-2" />
      <BsThreeDotsVertical className="ms-2" />
    </span>
  );
}
