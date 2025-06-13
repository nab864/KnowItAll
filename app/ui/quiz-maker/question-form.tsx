import { Question } from "@prisma/client";
import { useState } from "react";

export default function QuestionForm({
  index,
  question,
  handleQuestionChange,
}: {
  index: number;
  question: Question;
  handleQuestionChange: (
    index: number,
    field: string,
    value: string | string[]
  ) => void;
}) {
  const [incorrectAnswersArray, setIncorrectAnswersArray] = useState(question.incorrectAnswers);
  const [tagsArray, setTagsArray] = useState(question.tags);

  const handleInCorrectAnswersChange = (arrayIndex: number, value:string) => {
    const currentArray = incorrectAnswersArray
    currentArray[arrayIndex] = value
    setIncorrectAnswersArray(currentArray)
    handleQuestionChange(index, "inCorrectAnswers", currentArray)
  }
  
  const handleTagsChange = (arrayIndex: number, value:string) => {
    const currentArray = tagsArray
    currentArray[arrayIndex] = value
    setTagsArray(currentArray)
    handleQuestionChange(index, "tags", currentArray)
  }
  
  return (
    <div className="flex flex-col border border-black rounded-xl p-3 bg-component m-1">
      <h1 className="text-lg">{`Question ${index + 1}`}</h1>
      <input
        type="text"
        placeholder="Question"
        className="text-black pl-1"
        onChange={(e) =>
          handleQuestionChange(index, "question", e.target.value)
        }
        value={question.question}
      />
      <div className="flex">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Correct Answer"
            className="pl-1 mt-2 mb-1 mr-1"
            onChange={(e) =>
              handleQuestionChange(index, "correctAnswer", e.target.value)
            }
            value={question.correctAnswer}
          />
          <input
            type="text"
            placeholder="Incorrect Answer 1"
            className="pl-1 mt-1 mb-1 mr-1"
            onChange={(e) => {handleInCorrectAnswersChange(0, e.target.value)}}
            value={incorrectAnswersArray[0]}
          />
          <input
            type="text"
            placeholder="Incorrect Answer 2"
            className="pl-1 mt-1 mb-1 mr-1"
            onChange={(e) => {handleInCorrectAnswersChange(1, e.target.value)}}
            value={incorrectAnswersArray[1]}
          />
          <input
            type="text"
            placeholder="Incorrect Answer 3"
            className="pl-1 mt-1 mb-1 mr-1"
            onChange={(e) => {handleInCorrectAnswersChange(2, e.target.value)}}
            value={incorrectAnswersArray[2]}
          />
        </div>
        <div className="flex flex-col">
          <select
            name="difficulty"
            id="difficulty"
            className="text-black mt-2 mb-1 ml-1 p-0.5 pl-1 h-6"
            defaultValue={question.difficulty}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          <input
            type="text"
            placeholder="Tag 1"
            className="pl-1 mt-1 mb-1 ml-1"
            onChange={(e) => {handleTagsChange(0, e.target.value)}}
            value={tagsArray[0]}
          />
          <input
            type="text"
            placeholder="Tag 2"
            className="pl-1 mt-1 mb-1 ml-1"
            onChange={(e) => {handleTagsChange(1, e.target.value)}}
            value={tagsArray[1]}
          />
          <input
            type="text"
            placeholder="Tag 3"
            className="pl-1 mt-1 mb-1 ml-1"
            onChange={(e) => {handleTagsChange(2, e.target.value)}}
            value={tagsArray[2]}
          />
        </div>
      </div>
    </div>
  );
}
