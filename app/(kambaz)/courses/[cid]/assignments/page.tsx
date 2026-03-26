/* eslint-disable react-hooks/set-state-in-effect */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import {
  BsGripVertical,
  BsThreeDotsVertical,
  BsPlus,
  BsTrash,
} from "react-icons/bs";
import { FaSearch, FaCheckCircle } from "react-icons/fa";
import * as client from "../../client";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const [assignments, setAssignments] = useState<any[]>([]);

  const fetchAssignments = async () => {
    const data = await client.findAssignmentsForCourse(cid);
    setAssignments(data);
  };

  const onDeleteAssignment = async (assignmentId: string, title: string) => {
    const ok = window.confirm(
      `Delete "${title}"?\n\nAre you sure you want to remove this assignment?`,
    );
    if (!ok) return;

    await client.deleteAssignment(assignmentId);
    setAssignments(assignments.filter((a: any) => a._id !== assignmentId));
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

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

        {assignments.map((a: any) => (
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
                  onDeleteAssignment(a._id, a.title);
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
