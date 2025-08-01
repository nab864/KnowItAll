import { Question } from "@prisma/client";

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

  const handleInCorrectAnswersChange = (arrayIndex: number, value: string) => {
      const currentArray = [...question.incorrectAnswers];
      currentArray[arrayIndex] = value;
      handleQuestionChange(index, "incorrectAnswers", currentArray);
    
  }
  
  const handleTagsChange = (arrayIndex: number, value:string) => {
    const currentArray = [...question.tags];
    currentArray[arrayIndex] = value;
    handleQuestionChange(index, "tags", currentArray)
  }
  
  return (
    <div className="flex flex-col rounded-xl p-3 bg-component m-1" >
      <h1 className="text-lg">{`Question ${index + 1}`}</h1>
      <input
        type="text"
        placeholder="Question"
        className="pl-1 bg-background"
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
            className="pl-1 mt-2 mb-1 mr-1 bg-background"
            onChange={(e) =>
              handleQuestionChange(index, "correctAnswer", e.target.value)
            }
            value={question.correctAnswer}
          />
          <input
            type="text"
            placeholder="Incorrect Answer 1"
            className="pl-1 mt-1 mb-1 mr-1 bg-background"
            onChange={(e) => {handleInCorrectAnswersChange(0, e.target.value)}}
            value={question.incorrectAnswers[0]}
          />
          <input
            type="text"
            placeholder="Incorrect Answer 2"
            className="pl-1 mt-1 mb-1 mr-1 bg-background"
            onChange={(e) => {handleInCorrectAnswersChange(1, e.target.value)}}
            value={question.incorrectAnswers[1]}
          />
          <input
            type="text"
            placeholder="Incorrect Answer 3"
            className="pl-1 mt-1 mb-1 mr-1 bg-background"
            onChange={(e) => {handleInCorrectAnswersChange(2, e.target.value)}}
            value={question.incorrectAnswers[2]}
          />
        </div>
        <div className="flex flex-col">
          <select
            name="difficulty"
            id="difficulty"
            className="mt-2 mb-1 ml-1 p-0.5 pl-1 h-6 bg-background"
            defaultValue={question.difficulty}
            onChange={(e) =>
              handleQuestionChange(index, "difficulty", e.target.value)
            }
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          <input
            type="text"
            placeholder="Tag 1"
            className="pl-1 mt-1 mb-1 ml-1 bg-background"
            onChange={(e) => {handleTagsChange(0, e.target.value)}}
            value={question.tags[0]}
          />
          <input
            type="text"
            placeholder="Tag 2"
            className="pl-1 mt-1 mb-1 ml-1 bg-background"
            onChange={(e) => {handleTagsChange(1, e.target.value)}}
            value={question.tags[1]}
          />
          <input
            type="text"
            placeholder="Tag 3"
            className="pl-1 mt-1 mb-1 ml-1 bg-background"
            onChange={(e) => {handleTagsChange(2, e.target.value)}}
            value={question.tags[2]}
          />
        </div>
      </div>
    </div>
  );
}
