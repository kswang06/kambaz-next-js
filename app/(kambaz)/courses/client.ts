/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
  return response.data;
};

export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axios.put(
   `${COURSES_API}/${courseId}/modules/${module._id}`,
   module
 );
 return data;

};


export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};
export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};
export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const findAssignmentById = async (assignmentId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
};

export const deleteAssignment = async (assignmentId: string) => {
  await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};

export const findMyEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollments`
  );
  return data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
 const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
 return response.data;
};
export const unenrollFromCourse = async (userId: string, courseId: string) => {
 const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
 return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
 const response = await axios.get(`${COURSES_API}/${courseId}/users`);
 return response.data;
};

const getQuestions = (quiz: any) => {
  if (!Array.isArray(quiz.questions)) {
    return [];
  }
  return quiz.questions;
};

const getChoices = (question: any) => {
  if (!Array.isArray(question.choices)) {
    return [];
  }
  return question.choices;
};

const getAnswers = (question: any) => {
  if (!Array.isArray(question.blankAnswers)) {
    return [];
  }
  return question.blankAnswers;
};

const getAttemptAnswers = (attempt: any) => {
  if (!Array.isArray(attempt.answers)) {
    return [];
  }
  return attempt.answers;
};

const getAttemptResults = (attempt: any) => {
  if (!Array.isArray(attempt.results)) {
    return [];
  }
  return attempt.results;
};

const calculateQuizPoints = (quiz: any) => {
  const questions = getQuestions(quiz);
  let total = 0;

  for (const question of questions) {
    total += Number(question.points || 0);
  }

  return total;
};

const fromServerQuestion = (question: any) => {
  if (question.type === "TRUE_FALSE") {
    return {
      _id: question._id,
      type: "TRUE_FALSE",
      title: question.title || "New Question",
      points: Number(question.points || 0),
      question: question.question || "",
      answer: Boolean(question.trueFalseAnswer),
    };
  }

  if (question.type === "FILL_IN_THE_BLANK") {
    return {
      _id: question._id,
      type: "FILL_IN_THE_BLANK",
      title: question.title || "New Question",
      points: Number(question.points || 0),
      question: question.question || "",
      answers: getAnswers(question),
      caseSensitive: Boolean(question.caseSensitive),
    };
  }

  const choices = getChoices(question);
  const simpleChoices = [];
  let correctChoiceId = "";

  for (const choice of choices) {
    simpleChoices.push({
      _id: choice._id,
      text: choice.text,
    });

    if (choice.isCorrect && correctChoiceId === "") {
      correctChoiceId = choice._id;
    }
  }

  return {
    _id: question._id,
    type: "MULTIPLE_CHOICE",
    title: question.title || "New Question",
    points: Number(question.points || 0),
    question: question.question || "",
    choices: simpleChoices,
    correctChoiceId,
  };
};

const toServerQuestion = (question: any) => {
  if (question.type === "TRUE_FALSE") {
    return {
      _id: question._id,
      type: "TRUE_FALSE",
      title: question.title,
      points: Number(question.points || 0),
      question: question.question || "",
      trueFalseAnswer: Boolean(question.answer),
      choices: [],
      blankAnswers: [],
      caseSensitive: false,
    };
  }

  if (question.type === "FILL_IN_THE_BLANK") {
    return {
      _id: question._id,
      type: "FILL_IN_THE_BLANK",
      title: question.title,
      points: Number(question.points || 0),
      question: question.question || "",
      choices: [],
      blankAnswers: Array.isArray(question.answers) ? question.answers : [],
      caseSensitive: Boolean(question.caseSensitive),
    };
  }

  const serverChoices = [];
  const choices = Array.isArray(question.choices) ? question.choices : [];

  for (const choice of choices) {
    serverChoices.push({
      _id: choice._id,
      text: choice.text,
      isCorrect: choice._id === question.correctChoiceId,
    });
  }

  return {
    _id: question._id,
    type: "MULTIPLE_CHOICE",
    title: question.title,
    points: Number(question.points || 0),
    question: question.question || "",
    choices: serverChoices,
    blankAnswers: [],
    caseSensitive: false,
  };
};

const fromServerQuiz = (quiz: any) => {
  const questions = getQuestions(quiz);

  return {
    _id: quiz._id,
    courseId: quiz.course,
    title: quiz.title || "New Quiz",
    description: quiz.description || "",
    type: quiz.quizType || "GRADED_QUIZ",
    assignmentGroup: quiz.assignmentGroup || "QUIZZES",
    shuffleAnswers: Boolean(quiz.shuffleAnswers),
    timeLimit: Number(quiz.timeLimit || 20),
    multipleAttempts: Boolean(quiz.multipleAttempts),
    howManyAttempts: Number(quiz.howManyAttempts || 1),
    showCorrectAnswers: quiz.showCorrectAnswers || "IMMEDIATELY",
    accessCode: quiz.accessCode || "",
    oneQuestionAtATime: Boolean(quiz.oneQuestionAtATime),
    webcamRequired: Boolean(quiz.webcamRequired),
    lockQuestionsAfterAnswering: Boolean(quiz.lockQuestionsAfterAnswering),
    dueDate: quiz.dueDate || "",
    availableDate: quiz.availableDate || "",
    untilDate: quiz.untilDate || "",
    published: Boolean(quiz.published),
    questions: questions.map(fromServerQuestion),
    points:
      quiz.points !== undefined && quiz.points !== null
        ? Number(quiz.points)
        : calculateQuizPoints(quiz),
    createdAt: quiz.createdAt || "",
    updatedAt: quiz.updatedAt || "",
    availability: quiz.availability || null,
    lastAttempt: quiz.lastAttempt || null,
    numberOfQuestions:
      quiz.numberOfQuestions !== undefined && quiz.numberOfQuestions !== null
        ? Number(quiz.numberOfQuestions)
        : questions.length,
  };
};

const toServerQuiz = (quiz: any) => {
  const questions = Array.isArray(quiz.questions) ? quiz.questions : [];

  return {
    _id: quiz._id,
    course: quiz.courseId,
    title: quiz.title,
    description: quiz.description,
    quizType: quiz.type,
    assignmentGroup: quiz.assignmentGroup,
    shuffleAnswers: quiz.shuffleAnswers,
    timeLimit: Number(quiz.timeLimit || 0),
    multipleAttempts: quiz.multipleAttempts,
    howManyAttempts: Number(quiz.howManyAttempts || 1),
    showCorrectAnswers: quiz.showCorrectAnswers,
    accessCode: quiz.accessCode,
    oneQuestionAtATime: quiz.oneQuestionAtATime,
    webcamRequired: quiz.webcamRequired,
    lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
    dueDate: quiz.dueDate,
    availableDate: quiz.availableDate,
    untilDate: quiz.untilDate,
    published: quiz.published,
    questions: questions.map(toServerQuestion),
  };
};

const fromServerAttempt = (attempt: any) => {
  const answers = [];
  const results = [];

  for (const answer of getAttemptAnswers(attempt)) {
    answers.push({
      questionId: answer.questionId,
      value: answer.answer,
    });
  }

  for (const result of getAttemptResults(attempt)) {
    results.push({
      questionId: result.questionId,
      correct: Boolean(result.correct),
      submittedValue: result.submittedAnswer,
      correctValue: result.correctAnswer,
      pointsEarned: Number(result.earnedPoints || 0),
    });
  }

  return {
    _id: attempt._id,
    quizId: attempt.quiz,
    courseId: attempt.course,
    userId: attempt.user,
    submittedAt: attempt.submittedAt,
    score: Number(attempt.score || 0),
    pointsPossible: Number(attempt.totalPoints || 0),
    answers,
    results,
  };
};

const toServerAnswers = (answers: any[]) => {
  const serverAnswers = [];

  for (const answer of answers) {
    serverAnswers.push({
      questionId: answer.questionId,
      answer: answer.value,
    });
  }

  return serverAnswers;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return data.map(fromServerQuiz);
};

export const createQuizForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, {});
  return fromServerQuiz(data);
};

export const findQuizById = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return fromServerQuiz(data);
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    toServerQuiz(quiz),
  );
  return fromServerQuiz(data);
};

export const deleteQuiz = async (quizId: string) => {
  await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
};

export const togglePublishQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/publish`);
  return fromServerQuiz(data);
};

export const previewQuiz = async (quizId: string, answers: any[]) => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/preview`, {
    answers: toServerAnswers(answers),
  });
  return {
    score: Number(data.score || 0),
    pointsPossible: Number(data.totalPoints || 0),
    results: (data.results || []).map((result: any) => ({
      questionId: result.questionId,
      correct: Boolean(result.correct),
      submittedValue: result.submittedAnswer,
      correctValue: result.correctAnswer,
      pointsEarned: Number(result.earnedPoints || 0),
    })),
  };
};

export const findQuizAttemptsForCurrentUser = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
  return data.map(fromServerAttempt);
};

export const submitQuizAttempt = async (
  quizId: string,
  answers: any[],
  accessCode = "",
) => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, {
    answers: toServerAnswers(answers),
    accessCode,
  });
  return fromServerAttempt(data);
};







