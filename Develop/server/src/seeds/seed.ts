import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);


const pythonQuestionsPath = path.join(__dirname, 'pythonQuestions.json');
const pythonQuestions = JSON.parse(fs.readFileSync(pythonQuestionsPath, 'utf-8'));

console.log(pythonQuestions);

db.once('open', async () => {
  await cleanDB('Question', 'questions');

  await Question.insertMany(pythonQuestions);

  console.log('Questions seeded!');
  process.exit(0);
});
