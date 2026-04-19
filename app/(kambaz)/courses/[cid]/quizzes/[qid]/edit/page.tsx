/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Alert, Button, Card, Form, ListGroup, Nav } from "react-bootstrap";
import * as client from "../../../../client";

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
const createEmptyQuestion = () => ({
  _id: crypto.randomUUID(),
  isNew: true,
  type: "MULTIPLE_CHOICE",
  title: "New Question",
  points: 1,
  question: "",
  choices: [
    { _id: crypto.randomUUID(), text: "Option 1" },
    { _id: crypto.randomUUID(), text: "Option 2" },
  ],
  correctChoiceId: "",
});

export default function QuizEditorPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  const tab = searchParams.get("tab") === "questions" ? "questions" : "details";

  useEffect(() => {
    client.findQuizById(qid).then(setQuiz);
  }, [qid]);

  if (!quiz) {
    return <Alert variant="warning">Quiz not found.</Alert>;
  }

  const questions: any[] = Array.isArray(quiz.questions) ? quiz.questions : [];
  const questionPoints = questions.reduce(
    (sum: number, question: any) => sum + Number(question.points || 0),
    0,
  );
  const quizPoints = Number(quiz.points ?? questionPoints);
  const timedQuiz = Number(quiz.timeLimit || 0) > 0;

  const updateQuiz = (changes: any) => {
    setQuiz({ ...quiz, ...changes });
  };

  const persistQuiz = (changes?: any) => {
    return client
      .updateQuiz({ ...quiz, ...changes, points: Number((changes?.points ?? quiz.points) || 0) })
      .then((nextQuiz) => {
        setQuiz(nextQuiz);
        return nextQuiz;
      });
  };

  const saveAndReturn = () => {
    persistQuiz().then(() => router.push(`/courses/${cid}/quizzes/${qid}`));
  };

  const saveAndPublish = () => {
    persistQuiz({ published: true }).then(() => router.push(`/courses/${cid}/quizzes`));
  };

  const onNewQuestion = () => {
    const question = createEmptyQuestion();
    setQuiz({ ...quiz, questions: [...questions, question] });
    setEditingQuestionId(question._id);
  };

  const updateQuestion = (updatedQuestion: any) => {
    setQuiz({
      ...quiz,
      questions: questions.map((question) =>
        question._id === updatedQuestion._id
          ? { ...updatedQuestion, isNew: false }
          : question,
      ),
    });
    setEditingQuestionId(null);
  };

  const cancelQuestionEdit = (questionId: string, isNew: boolean) => {
    if (isNew) {
      removeQuestion(questionId);
      return;
    }
    setEditingQuestionId(null);
  };

  const removeQuestion = (questionId: string) => {
    setQuiz({
      ...quiz,
      questions: questions.filter((question) => question._id !== questionId),
    });
    setEditingQuestionId((current) => (current === questionId ? null : current));
  };

  return (
    <div id="wd-quiz-editor">
      <div className="d-flex justify-content-between flex-wrap gap-3 align-items-start mb-4">
        <div>
          <h2 className="mb-1">Edit Quiz</h2>
          <div className="text-muted">Configure quiz details and questions.</div>
        </div>
        <div className="d-flex gap-2">
          <Link href={`/courses/${cid}/quizzes`} className="btn btn-outline-secondary">
            Cancel
          </Link>
          <Button variant="outline-secondary" onClick={saveAndReturn}>
            Save
          </Button>
          <Button variant="danger" onClick={saveAndPublish}>
            Save And Publish
          </Button>
        </div>
      </div>

      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            as={Link}
            href={`/courses/${cid}/quizzes/${qid}/edit`}
            active={tab === "details"}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            href={`/courses/${cid}/quizzes/${qid}/edit?tab=questions`}
            active={tab === "questions"}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {tab === "details" ? (
        <Card>
          <Card.Body>
            <div className="row g-3">
              <div className="col-12">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={quiz.title}
                  onChange={(event) => updateQuiz({ title: event.target.value })}
                />
              </div>

              <div className="col-12">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={quiz.description}
                  onChange={(event) => updateQuiz({ description: event.target.value })}
                />
              </div>

              <div className="col-md-4">
                <Form.Label>Quiz Type</Form.Label>
                <Form.Select
                  value={quiz.type}
                  onChange={(event) => updateQuiz({ type: event.target.value })}
                >
                  {Object.entries(QUIZ_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="col-md-4">
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select
                  value={quiz.assignmentGroup}
                  onChange={(event) =>
                    updateQuiz({
                      assignmentGroup: event.target.value,
                    })
                  }
                >
                  {Object.entries(ASSIGNMENT_GROUP_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="col-md-4">
                <Form.Label>Points</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={quizPoints}
                  onChange={(event) => updateQuiz({ points: Number(event.target.value) || 0 })}
                />
              </div>

              <div className="col-md-3">
                <Form.Check
                  label="Shuffle Answers"
                  checked={quiz.shuffleAnswers}
                  onChange={(event) => updateQuiz({ shuffleAnswers: event.target.checked })}
                />
              </div>

              <div className="col-md-3">
                <Form.Check
                  label="Multiple Attempts"
                  checked={quiz.multipleAttempts}
                  onChange={(event) => updateQuiz({ multipleAttempts: event.target.checked })}
                />
              </div>

              <div className="col-md-3">
                <Form.Check
                  label="One Question At A Time"
                  checked={quiz.oneQuestionAtATime}
                  onChange={(event) => updateQuiz({ oneQuestionAtATime: event.target.checked })}
                />
              </div>

              <div className="col-md-3">
                <Form.Check
                  label="Webcam Required"
                  checked={quiz.webcamRequired}
                  onChange={(event) => updateQuiz({ webcamRequired: event.target.checked })}
                />
              </div>

              <div className="col-md-4">
                <Form.Check
                  label="Lock Questions After Answering"
                  checked={quiz.lockQuestionsAfterAnswering}
                  onChange={(event) =>
                    updateQuiz({ lockQuestionsAfterAnswering: event.target.checked })
                  }
                />
              </div>

              <div className="col-md-4">
                <Form.Check
                  className="mb-2"
                  label="Time Limit"
                  checked={timedQuiz}
                  onChange={(event) =>
                    updateQuiz({
                      timeLimit: event.target.checked ? Math.max(quiz.timeLimit || 20, 1) : 0,
                    })
                  }
                />
                <Form.Control
                  type="number"
                  min={0}
                  disabled={!timedQuiz}
                  value={quiz.timeLimit}
                  onChange={(event) => updateQuiz({ timeLimit: Number(event.target.value) })}
                />
              </div>

              <div className="col-md-4">
                <Form.Label>How Many Attempts</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  disabled={!quiz.multipleAttempts}
                  value={quiz.howManyAttempts}
                  onChange={(event) =>
                    updateQuiz({ howManyAttempts: Number(event.target.value) || 1 })
                  }
                />
              </div>

              <div className="col-md-4">
                <Form.Label>Show Correct Answers</Form.Label>
                <Form.Select
                  value={quiz.showCorrectAnswers}
                  onChange={(event) =>
                    updateQuiz({
                      showCorrectAnswers: event.target.value,
                    })
                  }
                >
                  {Object.entries(SHOW_CORRECT_ANSWER_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Form.Select>
              </div>

              <div className="col-md-4">
                <Form.Label>Access Code</Form.Label>
                <Form.Control
                  value={quiz.accessCode}
                  onChange={(event) => updateQuiz({ accessCode: event.target.value })}
                />
              </div>

              <div className="col-md-4">
                <Form.Check
                  className="mt-4"
                  label="Published"
                  checked={quiz.published}
                  onChange={(event) => updateQuiz({ published: event.target.checked })}
                />
              </div>

              <div className="col-md-4">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={quiz.dueDate}
                  onChange={(event) => updateQuiz({ dueDate: event.target.value })}
                />
              </div>

              <div className="col-md-4">
                <Form.Label>Available From</Form.Label>
                <Form.Control
                  type="date"
                  value={quiz.availableDate}
                  onChange={(event) => updateQuiz({ availableDate: event.target.value })}
                />
              </div>

              <div className="col-md-4">
                <Form.Label>Until</Form.Label>
                <Form.Control
                  type="date"
                  value={quiz.untilDate}
                  onChange={(event) => updateQuiz({ untilDate: event.target.value })}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="mb-1">Questions</h5>
              <div className="text-muted small">{questionPoints} total question points</div>
            </div>
            <Button variant="danger" onClick={onNewQuestion}>
              New Question
            </Button>
          </div>

          {questions.length === 0 ? (
            <Alert variant="secondary">No questions yet. Click New Question to begin.</Alert>
          ) : (
            <ListGroup className="mb-3">
              {questions.map((question, index) => (
                <ListGroup.Item key={question._id}>
                  {editingQuestionId === question._id ? (
                    <QuizQuestionEditor
                      initialQuestion={question}
                      onCancel={() => cancelQuestionEdit(question._id, Boolean(question.isNew))}
                      onSave={updateQuestion}
                    />
                  ) : (
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <div className="fw-bold">
                          {index + 1}. {question.title}
                        </div>
                        <div className="small text-muted">
                          {question.type.replaceAll("_", " ")} | {question.points} pts
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => setEditingQuestionId(question._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => removeQuestion(question._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </>
      )}
    </div>
  );
}

const QUESTION_TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: "Multiple Choice",
  TRUE_FALSE: "True / False",
  FILL_IN_THE_BLANK: "Fill In The Blank",
};

function QuizQuestionEditor({
  initialQuestion,
  onCancel,
  onSave,
}: {
  initialQuestion: any;
  onCancel: () => void;
  onSave: (question: any) => void;
}) {
  const [question, setQuestion] = useState<any>(initialQuestion);

  const updateBaseField = (field: "title" | "question" | "points", value: string) => {
    setQuestion({
      ...question,
      [field]: field === "points" ? Number(value) : value,
    });
  };

  const onTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextType = event.target.value;
    if (nextType === question.type) return;

    if (nextType === "TRUE_FALSE") {
      setQuestion({
        _id: question._id,
        title: question.title,
        points: question.points,
        question: question.question,
        type: "TRUE_FALSE",
        answer: true,
      });
      return;
    }

    if (nextType === "FILL_IN_THE_BLANK") {
      setQuestion({
        _id: question._id,
        title: question.title,
        points: question.points,
        question: question.question,
        type: "FILL_IN_THE_BLANK",
        answers: [""],
        caseSensitive: false,
      });
      return;
    }

    setQuestion({
      _id: question._id,
      title: question.title,
      points: question.points,
      question: question.question,
      type: "MULTIPLE_CHOICE",
      choices: [
        { _id: crypto.randomUUID(), text: "Option 1" },
        { _id: crypto.randomUUID(), text: "Option 2" },
      ],
      correctChoiceId: "",
    });
  };

  const normalizedQuestion = useMemo(() => {
    if (question.type !== "MULTIPLE_CHOICE") return question;
    return {
      ...question,
      correctChoiceId: question.correctChoiceId || question.choices[0]?._id || "",
    };
  }, [question]);

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="row g-3">
          <div className="col-md-8">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={question.title}
              onChange={(event) => updateBaseField("title", event.target.value)}
            />
          </div>
          <div className="col-md-4">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={question.points}
              onChange={(event) => updateBaseField("points", event.target.value)}
            />
          </div>
          <div className="col-md-4">
            <Form.Label>Question Type</Form.Label>
            <Form.Select value={question.type} onChange={onTypeChange}>
              {Object.entries(QUESTION_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="col-12">
            <Form.Label>Question</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={question.question}
              onChange={(event) => updateBaseField("question", event.target.value)}
            />
          </div>
        </div>

        {question.type === "MULTIPLE_CHOICE" && (
          <MultipleChoiceEditor question={question} onChange={setQuestion} />
        )}
        {question.type === "TRUE_FALSE" && (
          <TrueFalseEditor question={question} onChange={setQuestion} />
        )}
        {question.type === "FILL_IN_THE_BLANK" && (
          <FillBlankEditor question={question} onChange={setQuestion} />
        )}

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => onSave(normalizedQuestion)}>
            Save
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function MultipleChoiceEditor({
  question,
  onChange,
}: {
  question: any;
  onChange: (question: any) => void;
}) {
  const updateChoice = (choiceId: string, text: string) => {
    onChange({
      ...question,
      choices: question.choices.map((choice: any) =>
        choice._id === choiceId ? { ...choice, text } : choice,
      ),
    });
  };

  const addChoice = () => {
    onChange({
      ...question,
      choices: [...question.choices, { _id: crypto.randomUUID(), text: "" }],
    });
  };

  const removeChoice = (choiceId: string) => {
    const choices = question.choices.filter((choice: any) => choice._id !== choiceId);
    onChange({
      ...question,
      choices,
      correctChoiceId:
        question.correctChoiceId === choiceId ? choices[0]?._id ?? "" : question.correctChoiceId,
    });
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Form.Label className="mb-0">Choices</Form.Label>
        <Button variant="outline-secondary" size="sm" onClick={addChoice}>
          Add Option
        </Button>
      </div>
      {question.choices.map((choice: any, index: number) => (
        <div key={choice._id} className="d-flex align-items-center gap-2 mb-2">
          <Form.Check
            type="radio"
            name={`correct-${question._id}`}
            checked={question.correctChoiceId === choice._id}
            onChange={() => onChange({ ...question, correctChoiceId: choice._id })}
            label=""
          />
          <Form.Control
            value={choice.text}
            placeholder={`Choice ${index + 1}`}
            onChange={(event) => updateChoice(choice._id, event.target.value)}
          />
          <Button
            variant="outline-danger"
            size="sm"
            disabled={question.choices.length <= 2}
            onClick={() => removeChoice(choice._id)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

function TrueFalseEditor({
  question,
  onChange,
}: {
  question: any;
  onChange: (question: any) => void;
}) {
  return (
    <div className="mt-4">
      <Form.Label>Correct Answer</Form.Label>
      <div>
        <Form.Check
          inline
          type="radio"
          name={`true-false-${question._id}`}
          label="True"
          checked={question.answer === true}
          onChange={() => onChange({ ...question, answer: true })}
        />
        <Form.Check
          inline
          type="radio"
          name={`true-false-${question._id}`}
          label="False"
          checked={question.answer === false}
          onChange={() => onChange({ ...question, answer: false })}
        />
      </div>
    </div>
  );
}

function FillBlankEditor({
  question,
  onChange,
}: {
  question: any;
  onChange: (question: any) => void;
}) {
  const updateAnswer = (index: number, value: string) => {
    onChange({
      ...question,
      answers: question.answers.map((answer: string, answerIndex: number) =>
        answerIndex === index ? value : answer,
      ),
    });
  };

  const addAnswer = () => {
    onChange({ ...question, answers: [...question.answers, ""] });
  };

  const removeAnswer = (index: number) => {
    onChange({
      ...question,
      answers: question.answers.filter((_: string, answerIndex: number) => answerIndex !== index),
    });
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Form.Label className="mb-0">Blank Answers</Form.Label>
        <Button variant="outline-secondary" size="sm" onClick={addAnswer}>
          Add Blank
        </Button>
      </div>
      {question.answers.map((answer: string, index: number) => (
        <div key={`${question._id}-${index}`} className="d-flex gap-2 mb-2">
          <Form.Control
            value={answer}
            placeholder={`Blank ${index + 1} answer`}
            onChange={(event) => updateAnswer(index, event.target.value)}
          />
          <Button
            variant="outline-danger"
            size="sm"
            disabled={question.answers.length <= 1}
            onClick={() => removeAnswer(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Form.Check
        className="mt-2"
        label="Case sensitive"
        checked={question.caseSensitive}
        onChange={(event) => onChange({ ...question, caseSensitive: event.target.checked })}
      />
    </div>
  );
}
