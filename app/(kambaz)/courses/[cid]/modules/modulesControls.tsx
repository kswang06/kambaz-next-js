import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls() {
  return (
    <div
      id="wd-modules-controls"
      className="d-flex justify-content-end align-items-center gap-2 mb-3 flex-wrap"
    >
      <Button
        variant="secondary"
        size="lg"
        id="wd-collapse-all"
        style={{ minWidth: 160 }}
      >
        Collapse All
      </Button>

      <Button
        variant="secondary"
        size="lg"
        id="wd-view-progress"
        style={{ minWidth: 170 }}
      >
        View Progress
      </Button>

      <Dropdown>
        <DropdownToggle
          variant="secondary"
          size="lg"
          id="wd-publish-all-btn"
          style={{ minWidth: 170 }}
        >
          <GreenCheckmark /> Publish All
        </DropdownToggle>

        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button
        variant="danger"
        size="lg"
        id="wd-add-module-btn"
        style={{ minWidth: 140 }}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>
    </div>
  );
}
