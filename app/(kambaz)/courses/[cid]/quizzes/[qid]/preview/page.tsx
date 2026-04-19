/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../../../client";

const canTakeQuiz = (quiz: any, attempts: any[]) => {
  if (!quiz.published) {
    return { allowed: false, reason: "Quiz is unpublished." };
  }

  const today = new Date();
  const available = quiz.availableDate
    ? new Date(`${quiz.availableDate}T00:00:00`)
    : null;
  const until = quiz.untilDate ? new Date(`${quiz.untilDate}T23:59:59`) : null;

  if (available && today < available) {
    return { allowed: false, reason: `Available on ${quiz.availableDate}.` };
  }

  if (until && today > until) {
    return { allowed: false, reason: "Quiz is closed." };
  }

  if (!quiz.multipleAttempts && attempts.length >= 1) {
    return { allowed: false, reason: "Attempt limit reached." };
  }

  if (quiz.multipleAttempts && attempts.length >= quiz.howManyAttempts) {
    return { allowed: false, reason: "Attempt limit reached." };
  }

  return { allowed: true, reason: "" };
};

const answersByQuestion = (attempt?: any) =>
  new Map(
    (attempt?.answers || []).map((answer: any) => [
      answer.questionId,
      answer.value,
    ]),
  );

const resultByQuestion = (attempt?: any) =>
  new Map(
    (attempt?.results || []).map((result: any) => [
      result.questionId,
      result,
    ]),
  );

export default function QuizPreviewPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submittedAttempt, setSubmittedAttempt] = useState<any>(null);
  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const role = (currentUser as { role?: string } | null)?.role ?? "STUDENT";
  const isFaculty = role === "FACULTY";

  useEffect(() => {
    client.findQuizById(qid).then((data) => {
      setQuiz(data);
      setAccessGranted(!data.accessCode);
      setCurrentQuestionIndex(0);
    });

    client
      .findQuizAttemptsForCurrentUser(qid)
      .then(setAttempts)
      .catch(() => setAttempts([]));
  }, [qid]);

  const takeState = useMemo(() => {
    if (!quiz) {
      return { allowed: false, reason: "Quiz not found." };
    }

    return canTakeQuiz(quiz, attempts);
  }, [attempts, quiz]);

  if (!quiz) {
    return <Alert variant="warning">Quiz not found.</Alert>;
  }

  const fallbackAttempt =
    !isFaculty && attempts[0] && !canTakeQuiz(quiz, attempts).allowed ? attempts[0] : null;
  const readonlyAttempt = submittedAttempt ?? fallbackAttempt;
  const answerMap = answersByQuestion(readonlyAttempt ?? undefined);
  const resultMap = resultByQuestion(readonlyAttempt ?? undefined);
  const questions: any[] = Array.isArray(quiz.questions) ? quiz.questions : [];
  const currentQuestion = questions[currentQuestionIndex];

  const setAnswer = (questionId: string, value: any) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  };

  const submit = () => {
    const payload = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value,
    }));

    if (isFaculty) {
      client
        .previewQuiz(quiz._id, payload)
        .then((graded) => {
          setSubmittedAttempt({
            _id: "preview",
            quizId: quiz._id,
            courseId: quiz.courseId,
            userId: "preview",
            submittedAt: new Date().toISOString(),
            score: graded.score,
            pointsPossible: graded.pointsPossible,
            answers: payload,
            results: graded.results,
          });
        })
        .catch(() => window.alert("Failed to preview quiz."));
      return;
    }

    client.submitQuizAttempt(quiz._id, payload, accessCodeInput).then((saved) => {
      setSubmittedAttempt(saved);
      setAttempts((current) => [saved, ...current]);
    });
  };

  const resetFacultyPreview = () => {
    setAnswers({});
    setSubmittedAttempt(null);
    setCurrentQuestionIndex(0);
  };

  const allowStart =
    isFaculty ||
    (!readonlyAttempt &&
      takeState.allowed &&
      (quiz.accessCode ? accessGranted : true));

  return (
    <div id="wd-quiz-preview">
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <h2 className="mb-1">{isFaculty ? "Quiz Preview" : "Take Quiz"}</h2>
          <div className="text-muted">
            {quiz.title} • {quiz.points} points • {questions.length} questions
          </div>
        </div>
        <div className="d-flex gap-2">
          <Link href={`/courses/${cid}/quizzes/${qid}`} className="btn btn-outline-secondary">
            Back
          </Link>
          {isFaculty && (
            <Button
              variant="danger"
              onClick={() =>
                router.push(`/courses/${cid}/quizzes/${qid}/edit?tab=questions`)
              }
            >
              Edit Quiz
            </Button>
          )}
        </div>
      </div>

      {!isFaculty && !takeState.allowed && !submittedAttempt && (
        <Alert variant="secondary">{takeState.reason}</Alert>
      )}

      {quiz.accessCode &&
        !accessGranted &&
        !readonlyAttempt &&
        !isFaculty &&
        takeState.allowed && (
          <Card className="mb-4">
            <Card.Body>
              <Form.Label>Access Code</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  value={accessCodeInput}
                  onChange={(event) => setAccessCodeInput(event.target.value)}
                  placeholder="Enter quiz access code"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    if (accessCodeInput === quiz.accessCode) {
                      setAccessGranted(true);
                    } else {
                      window.alert("Incorrect access code.");
                    }
                  }}
                >
                  Unlock
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}

      {readonlyAttempt && (
        <Alert variant="info" className="mb-4">
          <div className="d-flex justify-content-between flex-wrap gap-3 align-items-center">
            <div>
              {isFaculty ? "Preview submitted." : "Last submitted attempt."}
              <div className="small mt-1">
                Submitted {new Date(readonlyAttempt.submittedAt).toLocaleString()}
              </div>
            </div>
            <div className="fw-bold">
              Score {readonlyAttempt.score}/{readonlyAttempt.pointsPossible}
            </div>
          </div>
        </Alert>
      )}

      {questions.length === 0 ? (
        <Alert variant="secondary">This quiz does not have any questions yet.</Alert>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
            <div className="fw-semibold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="d-flex flex-wrap gap-2">
              {questions.map((question, index) => (
                <Button
                  key={question._id}
                  size="sm"
                  variant={index === currentQuestionIndex ? "danger" : "outline-secondary"}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>

          <QuizQuestionCard
            key={currentQuestion._id}
            question={currentQuestion}
            index={currentQuestionIndex}
            readOnly={!allowStart || Boolean(readonlyAttempt)}
            answer={
              readonlyAttempt
                ? answerMap.get(currentQuestion._id)
                : answers[currentQuestion._id]
            }
            result={resultMap.get(currentQuestion._id)}
            showCorrectAnswers={Boolean(submittedAttempt)}
            onAnswerChange={setAnswer}
          />
        </>
      )}

      <div className="d-flex justify-content-between gap-2 mt-4 flex-wrap">
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            disabled={questions.length === 0 || currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex((index) => Math.max(index - 1, 0))}
          >
            Previous
          </Button>
          <Button
            variant="outline-secondary"
            disabled={questions.length === 0 || currentQuestionIndex === questions.length - 1}
            onClick={() =>
              setCurrentQuestionIndex((index) => Math.min(index + 1, questions.length - 1))
            }
          >
            Next
          </Button>
        </div>

        <div className="d-flex justify-content-end gap-2">
          {isFaculty && readonlyAttempt ? (
            <Button variant="outline-secondary" onClick={resetFacultyPreview}>
              Reset Preview
            </Button>
          ) : null}

          {!readonlyAttempt && allowStart && questions.length > 0 && (
            <Button variant="danger" onClick={submit}>
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const QUESTION_TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: "Multiple Choice",
  TRUE_FALSE: "True / False",
  FILL_IN_THE_BLANK: "Fill In The Blank",
};

function QuizQuestionCard({
  question,
  index,
  answer,
  readOnly = false,
  result,
  showCorrectAnswers = false,
  onAnswerChange,
}: {
  question: any;
  index: number;
  answer?: any;
  readOnly?: boolean;
  result?: any;
  showCorrectAnswers?: boolean;
  onAnswerChange?: (questionId: string, value: any) => void;
}) {
  const cardClassName = result
    ? result.correct
      ? "border-success"
      : "border-danger"
    : "";

  return (
    <Card className={`mb-3 ${cardClassName}`.trim()}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div>
            <h5 className="mb-1">
              {index + 1}. {question.title}
            </h5>
            <div className="text-muted small">{QUESTION_TYPE_LABELS[question.type]}</div>
          </div>
          <strong>{question.points} pts</strong>
        </div>

        <div className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
          {question.question || "No prompt provided."}
        </div>

        {question.type === "MULTIPLE_CHOICE" && (
          <Form>
            {question.choices.map((choice: any) => (
              <Form.Check
                key={choice._id}
                id={`${question._id}-${choice._id}`}
                type="radio"
                className="mb-2"
                name={`quiz-${question._id}`}
                label={choice.text || "Untitled choice"}
                checked={answer === choice._id}
                disabled={readOnly}
                onChange={() => onAnswerChange?.(question._id, choice._id)}
              />
            ))}
          </Form>
        )}

        {question.type === "TRUE_FALSE" && (
          <Form>
            <Form.Check
              id={`${question._id}-true`}
              type="radio"
              className="mb-2"
              name={`quiz-${question._id}`}
              label="True"
              checked={answer === true}
              disabled={readOnly}
              onChange={() => onAnswerChange?.(question._id, true)}
            />
            <Form.Check
              id={`${question._id}-false`}
              type="radio"
              name={`quiz-${question._id}`}
              label="False"
              checked={answer === false}
              disabled={readOnly}
              onChange={() => onAnswerChange?.(question._id, false)}
            />
          </Form>
        )}

        {question.type === "FILL_IN_THE_BLANK" && (
          <Form.Control
            value={typeof answer === "string" ? answer : ""}
            placeholder="Type your answer"
            disabled={readOnly}
            onChange={(event) => onAnswerChange?.(question._id, event.target.value)}
          />
        )}

        {result && (
          <Alert variant={result.correct ? "success" : "danger"} className="mt-3 mb-0">
            {result.correct ? "Correct" : "Incorrect"} • {result.pointsEarned}/
            {question.points} pts
            {showCorrectAnswers && !result.correct && (
              <div className="mt-2">
                Correct answer:{" "}
                <strong>{formatCorrectAnswer(question, result.correctValue)}</strong>
              </div>
            )}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

function formatCorrectAnswer(question: any, correctValue: any) {
  if (question.type === "MULTIPLE_CHOICE") {
    return (
      question.choices.find((choice: any) => choice._id === correctValue)?.text ??
      "Correct choice"
    );
  }
  if (question.type === "TRUE_FALSE") {
    return String(correctValue);
  }
  return Array.isArray(correctValue) ? correctValue.join(", ") : String(correctValue);
}
