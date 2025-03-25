import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

import fs from 'fs';
const pythonQuestions = JSON.parse(fs.readFileSync('./pythonQuestions.json', 'utf8'));

db.once('open', async () => {
  await cleanDB('Question', 'questions');

  await Question.insertMany(pythonQuestions);

  console.log('Questions seeded!');
  process.exit(0);
});
