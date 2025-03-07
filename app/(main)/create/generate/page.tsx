"use client"
import { generateQuiz } from "@/app/lib/actions"
import { useState } from "react"


export default function Page() {
  const [quiz, setQuiz] = useState({})
  const handleOnClick = async () => {
    setQuiz(await generateQuiz("History", 5))
    console.log(quiz)
  }
  return (
    <div className="flex flex-col justify-center items-center h-full ml-44 mt-10">
      <h1>Generate Quiz</h1>
      <form action="">
        <select name="category" id="category" className="text-black">
          <option value="General Knowledge">General Knowledge</option>
          <option value="Geography">Geography</option>
          <option value="Society & Culture">Society & Culture</option>
          <option value="Music">Music</option>
          <option value="Food & Drink">Food & Drink</option>
          <option value="Sport & Leisure">Sport & Leisure</option>
          <option value="Film & TV">Film & TV</option>
          <option value="Science">Science</option>
          <option value="Arts & Literature">Arts & Literature</option>
          <option value="History">History</option>
        </select>
      </form>
    </div>
  )
}