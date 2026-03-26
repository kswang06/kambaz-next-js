/* eslint-disable react-hooks/set-state-in-effect */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../client";
import { Button, Form } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();

  const [assignment, setAssignment] = useState<any>({
    _id: "",
    title: "",
    description: "",
    points: 0,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    course: cid,
  });

  const fetchAssignment = async () => {
    if (aid === "new") return;
    const data = await client.findAssignmentById(aid);
    setAssignment(data);
  };

  const saveAssignment = async () => {
    if (aid === "new") {
      await client.createAssignmentForCourse(cid, assignment);
    } else {
      await client.updateAssignment(assignment);
    }
    router.push(`/courses/${cid}/assignments`);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div id="wd-assignments-editor">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            id="wd-name"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Control
            as="textarea"
            rows={4}
            id="wd-description"
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label>Points</Form.Label>
          <Form.Control
            id="wd-points"
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                points: Number(e.target.value),
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-select-assignment-group">
          <Form.Label>Assignment Group</Form.Label>
          <Form.Select
            id="wd-select-assignment-group"
            defaultValue="ASSIGNMENTS"
          >
            <option value="EXAM">EXAM</option>
            <option value="QUIZ">QUIZ</option>
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-select-display-grade">
          <Form.Label>Display Grade as</Form.Label>
          <Form.Select id="wd-select-display-grade" defaultValue="Letter">
            <option value="Percentage">Percentage</option>
            <option value="Letter">Letter</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-select-submission-type">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select id="wd-select-submission-type" defaultValue="Online">
            <option value="Form">Form</option>
            <option value="Online">Online</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-online-entry-options">
          <Form.Label>Online Entry Options</Form.Label>
          <div className="border p-3">
            <Form.Check
              type="checkbox"
              label="Text Entry"
              id="wd-chkbox-text-entry"
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              label="Website URL"
              id="wd-chkbox-website-url"
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              label="Media Recordings"
              id="wd-chkbox-media-recordings"
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              label="Student Annotation"
              id="wd-chkbox-student-annotation"
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              label="File Uploads"
              id="wd-chkbox-file-uploads"
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-assign-to-box">
          <Form.Label>Assign</Form.Label>

          <div className="border p-3">
            <Form.Group className="mb-3" controlId="wd-assign-to">
              <Form.Label>Assign to</Form.Label>
              <Form.Control id="wd-assign-to" defaultValue="Everyone" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-due-date">
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="date"
                id="wd-due-date"
                value={assignment.dueDate}
                onChange={(e) =>
                  setAssignment({ ...assignment, dueDate: e.target.value })
                }
              />
            </Form.Group>

            <div className="d-flex">
              <div className="me-2 w-50">
                <Form.Group className="mb-3" controlId="wd-available-date">
                  <Form.Label>Available from</Form.Label>
                  <Form.Control
                    type="date"
                    id="wd-available-date"
                    value={assignment.availableDate}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </div>

              <div className="w-50">
                <Form.Group className="mb-3" controlId="wd-until-date">
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="date"
                    id="wd-until-date"
                    value={assignment.untilDate}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        untilDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
            </div>
          </div>
        </Form.Group>

        <div className="float-end">
          <Link
            href={`/courses/${cid}/assignments`}
            className="btn btn-secondary me-2"
          >
            Cancel
          </Link>
          <Button
            type="button"
            className="btn btn-danger"
            onClick={saveAssignment}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
