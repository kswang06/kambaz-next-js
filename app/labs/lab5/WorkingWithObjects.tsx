"use client";
import React, { useState } from "react";
import FormCheck from "react-bootstrap/esm/FormCheck";
import FormControl from "react-bootstrap/esm/FormControl";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [courseModule, setCourseModule] = useState({
    id: "1",
    name: "Routes and stuff",
    description: "Learning routes and stuff",
    course: "CS4550",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <a
        id="wd-retrieve-module"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/module`}
      >
        Get Module
      </a>
      <hr />

      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <a
        id="wd-retrieve-module-name"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />

      <h4>Modifying Assignment</h4>

      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(assignment.title)}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-title"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      <a
        id="wd-update-assignment-score"
        className="btn btn-warning float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-score"
        type="number"
        value={assignment.score}
        onChange={(e) =>
          setAssignment({
            ...assignment,
            score: parseInt(e.target.value || "0"),
          })
        }
      />

      <a
        id="wd-update-assignment-completed"
        className="btn btn-success float-end"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
      <FormCheck
        className="mb-3"
        id="wd-assignment-completed"
        label="Completed"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />
      <hr />

      <h4>Modifying Module</h4>

      <a
        id="wd-update-module-name"
        className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/name/${encodeURIComponent(courseModule.name)}`}
      >
        Update Module Name
      </a>
      <FormControl
        className="w-75 mb-2"
        id="wd-module-name"
        value={courseModule.name}
        onChange={(e) =>
          setCourseModule({ ...courseModule, name: e.target.value })
        }
      />

      <a
        id="wd-update-module-description"
        className="btn btn-secondary float-end"
        href={`${MODULE_API_URL}/description/${encodeURIComponent(courseModule.description)}`}
      >
        Update Module Description
      </a>
      <FormControl
        className="w-75 mb-2"
        id="wd-module-description"
        value={courseModule.description}
        onChange={(e) =>
          setCourseModule({
            ...courseModule,
            description: e.target.value,
          })
        }
      />
      <hr />
    </div>
  );
}
