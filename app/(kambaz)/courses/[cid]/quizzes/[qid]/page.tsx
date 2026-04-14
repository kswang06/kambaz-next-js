/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, Badge, Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../../../client";

const QUIZ_TYPE_LABELS: Record<string, string> = {
  GRADED_QUIZ: "Graded Quiz",
  PRACTICE_QUIZ: "Practice Quiz",
  GRADED_SURVEY: "Graded Survey",
  UNGRADED_SURVEY: "Ungraded Survey",
};
const ASSIGNMENT_GROUP_LABELS: Record<string, string> = {
  QUIZZES: "Quizzes",
  EXAMS: "Exams",
  ASSIGNMENTS: "Assignments",
  PROJECT: "Project",
};
const SHOW_CORRECT_ANSWER_LABELS: Record<string, string> = {
  NEVER: "Never",
  IMMEDIATELY: "Immediately",
  AFTER_DUE_DATE: "After due date",
  AFTER_LAST_ATTEMPT: "After last attempt",
};
const formatDate = (value?: string) =>
  value ? new Date(`${value}T00:00:00`).toLocaleDateString() : "Not set";
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

const DETAIL_ROWS: Array<[string, string]> = [
  ["type", "Quiz Type"],
  ["assignmentGroup", "Assignment Group"],
  ["shuffleAnswers", "Shuffle Answers"],
  ["timeLimit", "Time Limit"],
  ["multipleAttempts", "Multiple Attempts"],
  ["howManyAttempts", "How Many Attempts"],
  ["showCorrectAnswers", "Show Correct Answers"],
  ["accessCode", "Access Code"],
  ["oneQuestionAtATime", "One Question At A Time"],
  ["webcamRequired", "Webcam Required"],
  ["lockQuestionsAfterAnswering", "Lock Questions After Answering"],
];

export default function QuizDetailsPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);

  const role = (currentUser as { role?: string } | null)?.role ?? "STUDENT";
  const isFaculty = role === "FACULTY";
  const userId =
    (currentUser as { _id?: string; id?: string } | null)?._id ||
    (currentUser as { _id?: string; id?: string } | null)?.id ||
    "anonymous";

  useEffect(() => {
    client.findQuizById(qid).then((data) => {
      setQuiz(data);
      if ((data as any).lastAttempt) {
        setAttempts([
          {
            score: (data as any).lastAttempt.score,
            pointsPossible: (data as any).lastAttempt.totalPoints,
            submittedAt: (data as any).lastAttempt.submittedAt,
          },
        ]);
      } else {
        setAttempts([]);
      }
    });
  }, [qid, userId]);

  const takeState = useMemo(() => {
    if (!quiz) return { allowed: false, reason: "Quiz not found." };
    return canTakeQuiz(quiz, attempts);
  }, [attempts, quiz]);

  if (!quiz) {
    return <Alert variant="warning">Quiz not found.</Alert>;
  }

  const lastAttempt = attempts[0];

  const publishToggle = () => {
    client
      .togglePublishQuiz(quiz._id)
      .then((updated) => setQuiz(updated))
      .catch(() => window.alert("Failed to update publish status."));
  };

  return (
    <div id="wd-quiz-details">
      <div className="d-flex flex-wrap justify-content-between gap-3 align-items-start mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <h2 className="mb-0">{quiz.title}</h2>
            <Badge bg={quiz.published ? "success" : "secondary"}>
              {quiz.published ? "Published" : "Unpublished"}
            </Badge>
          </div>
          <div className="text-muted" style={{ whiteSpace: "pre-wrap" }}>
            {quiz.description || "No description provided."}
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <Link href={`/courses/${cid}/quizzes`} className="btn btn-outline-secondary">
            Back To Quizzes
          </Link>
          {isFaculty ? (
            <>
              <Button variant="outline-secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
                Preview
              </Button>
              <Button variant="danger" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
                Edit
              </Button>
              <Button
                variant={quiz.published ? "outline-secondary" : "outline-success"}
                onClick={publishToggle}
              >
                {quiz.published ? "Unpublish" : "Publish"}
              </Button>
            </>
          ) : (
            <Button
              variant="danger"
              disabled={!takeState.allowed}
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}
            >
              {attempts.length > 0 && takeState.allowed ? "Take Again" : "Start Quiz"}
            </Button>
          )}
        </div>
      </div>

      {!isFaculty && !takeState.allowed && (
        <Alert variant="secondary" className="mb-4">
          {takeState.reason}
        </Alert>
      )}

      {!isFaculty && lastAttempt && (
        <Card className="mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between flex-wrap gap-3">
              <div>
                <h5 className="mb-1">Last Attempt</h5>
                <div className="text-muted small">
                  Submitted {new Date(lastAttempt.submittedAt).toLocaleString()}
                </div>
              </div>
              <div className="text-end">
                <div className="small text-muted">Score</div>
                <div className="fs-4 fw-bold">
                  {lastAttempt.score}/{lastAttempt.pointsPossible}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}

      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <Card className="h-100">
            <Card.Body>
              <h5 className="mb-3">Details</h5>
              <div className="row g-3">
                {DETAIL_ROWS.map(([field, label]) => (
                  <div key={field} className="col-md-6">
                    <div className="text-muted small">{label}</div>
                    <div>{renderDetailValue(quiz, field)}</div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="h-100">
            <Card.Body>
              <h5 className="mb-3">Availability</h5>
              <div className="mb-3">
                <div className="text-muted small">Due</div>
                <div>{formatDate(quiz.dueDate)}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">Available From</div>
                <div>{formatDate(quiz.availableDate)}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">Until</div>
                <div>{formatDate(quiz.untilDate)}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">Points</div>
                <div>{quiz.points}</div>
              </div>
              <div>
                <div className="text-muted small">Questions</div>
                <div>{quiz.questions.length}</div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

function renderDetailValue(quiz: any, field: string) {
  const value = quiz[field];
  switch (field) {
    case "type":
      return QUIZ_TYPE_LABELS[quiz.type];
    case "assignmentGroup":
      return ASSIGNMENT_GROUP_LABELS[quiz.assignmentGroup];
    case "showCorrectAnswers":
      return SHOW_CORRECT_ANSWER_LABELS[quiz.showCorrectAnswers];
    case "timeLimit":
      return `${quiz.timeLimit} minutes`;
    case "accessCode":
      return quiz.accessCode || "None";
    case "multipleAttempts":
    case "shuffleAnswers":
    case "oneQuestionAtATime":
    case "webcamRequired":
    case "lockQuestionsAfterAnswering":
      return value ? "Yes" : "No";
    default:
      return String(value);
  }
}
