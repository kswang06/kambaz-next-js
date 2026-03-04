"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../database";

import { Button, Form } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  const assignment = db.assignments.find((a: any) => a._id === aid);

  return (
    <div id="wd-assignments-editor">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control id="wd-name" defaultValue={assignment?.title || ""} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Control
            as="textarea"
            rows={4}
            id="wd-description"
            defaultValue={assignment?.description || ""}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label>Points</Form.Label>
          <Form.Control
            id="wd-points"
            type="number"
            defaultValue={assignment?.points ?? 0}
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

        <Form.Group className="mb-3" controlId="wd-assign-to">
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
                defaultValue={assignment?.dueDate || ""}
                id="wd-due-date"
              />
            </Form.Group>

            <div className="d-flex">
              <div className="me-2 w-50">
                <Form.Group className="mb-3" controlId="wd-available-date">
                  <Form.Label>Available from</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={assignment?.availableDate || ""}
                    id="wd-available-date"
                  />
                </Form.Group>
              </div>

              <div className="w-50">
                <Form.Group className="mb-3" controlId="wd-until-date">
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={assignment?.untilDate || ""}
                    id="wd-until-date"
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
          <Link href={`/courses/${cid}/assignments`} className="btn btn-danger">
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}
