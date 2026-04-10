/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-assign-module-variable */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as client from "../../client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { modules as modulesData } from "../../../database";

import { setModules, editModule, updateModule, deleteModule } from "./reducer";

import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

import ModulesControls from "./modulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const [moduleName, setModuleName] = useState("");

  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  const fetchModules = async () => {
    console.log("Fetching modules for course:", cid);
    try {
      const apiModules = await client.findModulesForCourse(cid as string);
      console.log("API returned modules:", apiModules);

      if (apiModules && apiModules.length > 0) {
        console.log("Using API modules:", apiModules.length);
        dispatch(setModules(apiModules));
      } else {
        const localModules = modulesData.filter((m: any) => m.course === cid);
        console.log("Using local modules:", localModules.length, localModules);
        dispatch(setModules(localModules));
      }
    } catch (error) {
      console.error(
        "Error fetching modules from API, using local data:",
        error,
      );
      const localModules = modulesData.filter((m: any) => m.course === cid);
      console.log("Fallback to local modules:", localModules.length);
      dispatch(setModules(localModules));
    }
  };

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const createdModule = await client.createModuleForCourse(cid, newModule);
    dispatch(setModules([...modules, createdModule]));
  };
  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(cid, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    await client.updateModule(cid, module);
    const newModules = modules.map((m: any) =>
      m._id === module._id ? module : m,
    );
    dispatch(setModules(newModules));
  };

  useEffect(() => {
    if (cid) {
      fetchModules();
    }
  }, [cid]);

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse}
      />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.length === 0 ? (
          <div className="p-3 text-muted">
            <p>No modules found for this course.</p>
            <p>Course ID: {cid}</p>
            <p>Modules should load from the database automatically.</p>
          </div>
        ) : (
          modules.map((module: any) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />

                {!module.editing && module.name}

                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    value={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value }),
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onUpdateModule({
                          ...module,
                          name: e.currentTarget.value,
                          editing: false,
                        });
                      }
                    }}
                  />
                )}

                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => onRemoveModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}
