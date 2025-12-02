"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { setModules, editModule, updateModule } from "./reducer";
import * as client from "../../client";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import "../../../styles.css";

interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchModules = useCallback(async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  }, [cid, dispatch]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const createdModule = await client.createModuleForCourse(cid as string, newModule);
    dispatch(setModules([...modules, createdModule]));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    try {
      await client.deleteModule(cid as string, moduleId);
      await fetchModules();
    } catch (error) {
      console.error("Error deleting module:", error);
      alert("Failed to delete module. Please try again.");
    }
  };

  const onUpdateModule = async (moduleData: any) => {
    try {
      const { editing, ...moduleToUpdate } = moduleData;
      await client.updateModule(cid as string, moduleToUpdate);
      await fetchModules();
    } catch (error) {
      console.error("Error updating module:", error);
      alert("Failed to update module. Please try again.");
    }
  };

  const isFaculty = currentUser && (currentUser.role === "FACULTY" || currentUser.role === "ADMIN");

  return (
    <div className="wd-modules">
      {isFaculty && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}
      <br />
      <br />
      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .map((module: Module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && isFaculty && (
                  <FormControl
                    className="w-50 d-inline-block"
                    value={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        const updatedModule = { ...module, editing: false };
                        await onUpdateModule(updatedModule);
                      }
                    }}
                  />
                )}
                {isFaculty && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => onRemoveModule(moduleId)}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                    updateModule={async () => {
                      const updatedModule = { ...module, editing: false };
                      await onUpdateModule(updatedModule);
                    }}
                    isEditing={module.editing}
                  />
                )}
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
