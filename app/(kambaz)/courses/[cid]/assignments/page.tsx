// app/(kambaz)/courses/[cid]/assignments/page.tsx
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";

import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import {
  BsGripVertical,
  BsThreeDotsVertical,
  BsPlus,
  BsTrash,
} from "react-icons/bs";
import { FaSearch, FaCheckCircle } from "react-icons/fa";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );

  return (
    <div id="wd-assignments">
      <div className="d-flex mb-3">
        <div className="me-auto">
          <FaSearch className="me-2" />
          <Form.Control
            id="wd-search-assignment"
            placeholder="Search for Assignments"
            style={{ width: "300px", display: "inline-block" }}
          />
        </div>

        <Button
          id="wd-add-assignment-group"
          variant="secondary"
          className="me-2"
        >
          <BsPlus /> Group
        </Button>

        <Button
          id="wd-add-assignment"
          variant="danger"
          onClick={() => router.push(`/courses/${cid}/assignments/new`)}
        >
          <BsPlus /> Assignment
        </Button>
      </div>

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem>
          <BsGripVertical className="me-2" />
          <strong>ASSIGNMENTS</strong> 40% of Total
          <span className="float-end">
            <BsPlus className="me-2" />
            <BsThreeDotsVertical />
          </span>
        </ListGroupItem>

        {assignments
          .filter((a: any) => a.course === cid)
          .map((a: any) => (
            <ListGroupItem key={a._id}>
              <BsGripVertical className="me-2" />

              <Link
                href={`/courses/${cid}/assignments/${a._id}`}
                className="fw-bold text-decoration-none text-dark"
              >
                {a.title}
              </Link>

              <br />

              <small>
                Multiple Modules | Not available until {a.availableDate} | Due{" "}
                {a.dueDate} | {a.points}pts
              </small>

              <span className="float-end">
                <button
                  className="btn btn-sm btn-link text-danger p-0 me-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const ok = window.confirm(
                      `Delete "${a.title}"?\n\nAre you sure you want to remove this assignment?`,
                    );
                    if (!ok) return;
                    dispatch(deleteAssignment(a._id));
                  }}
                  aria-label={`Delete ${a.title}`}
                  title="Delete"
                >
                  <BsTrash />
                </button>

                <FaCheckCircle className="text-success me-2" />
                <BsThreeDotsVertical />
              </span>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
