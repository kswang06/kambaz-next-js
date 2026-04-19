/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Dropdown, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsPencilSquare, BsPlus, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { FaBan, FaCheckCircle, FaRegClipboard } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";

const formatDate = (value?: string) =>
  value ? new Date(`${value}T00:00:00`).toLocaleDateString() : "Not set";

const quizAvailabilityLabel = (quiz: any) => {
  if (quiz.availability?.label) return quiz.availability.label;
  const today = new Date();
  const available = quiz.availableDate ? new Date(`${quiz.availableDate}T00:00:00`) : null;
  const until = quiz.untilDate ? new Date(`${quiz.untilDate}T23:59:59`) : null;
  if (available && today < available) return `Not available until ${formatDate(quiz.availableDate)}`;
  if (until && today > until) return "Closed";
  return "Available";
};

const canTakeQuiz = (quiz: any, attempts: any[]) => {
  if (!quiz.published) return { allowed: false, reason: "Quiz is unpublished." };
  const today = new Date();
  const available = quiz.availableDate ? new Date(`${quiz.availableDate}T00:00:00`) : null;
  const until = quiz.untilDate ? new Date(`${quiz.untilDate}T23:59:59`) : null;
  if (available && today < available) {
    return { allowed: false, reason: `Available on ${formatDate(quiz.availableDate)}.` };
  }
  if (until && today > until) return { allowed: false, reason: "Quiz is closed." };
  if (!quiz.multipleAttempts && attempts.length >= 1) {
    return { allowed: false, reason: "Attempt limit reached." };
  }
  if (quiz.multipleAttempts && attempts.length >= quiz.howManyAttempts) {
    return { allowed: false, reason: "Attempt limit reached." };
  }
  return { allowed: true, reason: "" };
};

export default function QuizzesPage() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [sortBy, setSortBy] = useState("availableDate");
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const role =
    currentUser && typeof currentUser === "object" && "role" in currentUser
      ? (currentUser as { role?: string }).role || "STUDENT"
      : "STUDENT";
  const isFaculty = role === "FACULTY";

  const loadQuizzes = async () => {
    const data = await client.findQuizzesForCourse(cid);
    setQuizzes(data);
  };

  useEffect(() => {
    loadQuizzes();
  }, [cid]);

  const visibleQuizzes = useMemo(() => {
    const scoped = isFaculty ? quizzes : quizzes.filter((quiz) => quiz.published);
    const items = [...scoped];
    const compareDate = (left?: string, right?: string) => {
      const leftValue = left || "9999-12-31";
      const rightValue = right || "9999-12-31";
      return leftValue.localeCompare(rightValue);
    };
    items.sort((a, b) => {
      if (sortBy === "dueDate") return compareDate(a.dueDate, b.dueDate);
      if (sortBy === "availableDate") {
        return compareDate(a.availableDate, b.availableDate);
      }
      return a.title.localeCompare(b.title);
    });
    return items;
  }, [isFaculty, quizzes, sortBy]);

  const onAddQuiz = () => {
    client.createQuizForCourse(cid).then((quiz) => {
      setQuizzes((current) => [quiz, ...current]);
      router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`);
    });
  };

  const onDeleteQuiz = (quiz: any) => {
    const confirmed = window.confirm(`Delete "${quiz.title}"?`);
    if (!confirmed) return;
    client.deleteQuiz(quiz._id).then(() => {
      setQuizzes((current) => current.filter((item) => item._id !== quiz._id));
    });
  };

  const onTogglePublish = (quiz: any) => {
    client.togglePublishQuiz(quiz._id).then((updatedQuiz) => {
      setQuizzes((current) =>
        current.map((item) => (item._id === updatedQuiz._id ? updatedQuiz : item)),
      );
    });
  };

  return (
    <div id="wd-quizzes">
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <div className="me-auto">
          <h3 className="mb-1">Quizzes</h3>
          <div className="text-muted small">Course-scoped quizzes for this course.</div>
        </div>

        <Form.Select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          style={{ width: 200 }}
        >
          <option value="title">Sort by name</option>
          <option value="dueDate">Sort by due date</option>
          <option value="availableDate">Sort by available date</option>
        </Form.Select>

        {isFaculty && (
          <Button variant="danger" onClick={onAddQuiz} id="wd-add-quiz">
            <BsPlus /> Quiz
          </Button>
        )}
      </div>

      {visibleQuizzes.length === 0 ? (
        <div className="border rounded p-4 text-muted">
          <FaRegClipboard className="me-2" />
          No quizzes yet.{" "}
          {isFaculty ? "Click + Quiz to create one." : "No published quizzes are available."}
        </div>
      ) : (
        <ListGroup className="rounded-0">
          {visibleQuizzes.map((quiz) => {
            const lastAttempt = (quiz as any).lastAttempt
              ? {
                  score: (quiz as any).lastAttempt.score,
                  pointsPossible: (quiz as any).lastAttempt.totalPoints,
                }
              : null;
            const attempts = lastAttempt ? [lastAttempt] : [];
            const availability = quizAvailabilityLabel(quiz);
            const takeState = canTakeQuiz(quiz, attempts);

            return (
              <ListGroupItem key={quiz._id} className="py-3">
                <div className="d-flex justify-content-between gap-3 align-items-start">
                  <div className="d-flex gap-3 flex-grow-1">
                    <button
                      className="btn btn-link p-0 text-decoration-none"
                      aria-label={quiz.published ? "Unpublish quiz" : "Publish quiz"}
                      onClick={() => isFaculty && onTogglePublish(quiz)}
                      disabled={!isFaculty}
                    >
                      {quiz.published ? (
                        <FaCheckCircle className="text-success fs-5" />
                      ) : (
                        <FaBan className="text-secondary fs-5" />
                      )}
                    </button>

                    <div className="flex-grow-1">
                      <Link
                        href={`/courses/${cid}/quizzes/${quiz._id}`}
                        className="fw-bold text-decoration-none text-dark"
                      >
                        {quiz.title}
                      </Link>

                      <div className="small text-muted mt-1">
                        {availability} | Due {formatDate(quiz.dueDate)} | {quiz.points} pts |{" "}
                        {quiz.questions.length} questions
                        {!isFaculty && lastAttempt
                          ? ` | Score ${lastAttempt.score}/${lastAttempt.pointsPossible}`
                          : ""}
                      </div>

                      {!isFaculty && !takeState.allowed && (
                        <div className="small text-muted mt-1">{takeState.reason}</div>
                      )}
                    </div>
                  </div>

                  {isFaculty && (
                    <div className="d-flex align-items-center gap-2">
                      <Dropdown align="end">
                        <Dropdown.Toggle
                          variant="outline-secondary"
                          size="sm"
                          id={`wd-quiz-menu-${quiz._id}`}
                        >
                          <BsThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`)}
                          >
                            <BsPencilSquare className="me-2" />
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => onTogglePublish(quiz)}>
                            {quiz.published ? (
                              <>
                                <FaBan className="me-2" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <FaCheckCircle className="me-2 text-success" />
                                Publish
                              </>
                            )}
                          </Dropdown.Item>
                          <Dropdown.Item className="text-danger" onClick={() => onDeleteQuiz(quiz)}>
                            <BsTrash className="me-2" />
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </div>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
}
