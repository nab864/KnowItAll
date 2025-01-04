import { fetchAllQuestions } from "./lib/data";
import NavBar from "./ui/navbar";

export default async function Home() {
  const questions = await fetchAllQuestions();
  return (
  <div className="text-center">
    <h1 className="text-9xl">Know It All</h1>
    <h3 className="text-2xl">Welcome!</h3>
    <p>Dive into trivia, challenge your friends, and uncover weird facts along the way.</p>
    <p>Think you know it all? Prove it.</p>
    <NavBar />
  </div>
  );
}
