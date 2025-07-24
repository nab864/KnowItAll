import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GenerateForm({ fetchQuiz }: { fetchQuiz: () => void }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("number", "10");
    params.set("category", "General Knowledge");
    replace(`${pathname}?${params.toString()}`);
  }, []);

  const handleCategoryChange = async (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleAmountChange = async (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("number", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className="flex flex-col bg-component p-2 rounded-lg"
      action={fetchQuiz}
    >
      <select
        name="category"
        id="category"
        className="text-black p-1 mb-4"
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
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
      <input
        type="range"
        min={5}
        max={15}
        onChange={(e) => handleAmountChange(e.target.value)}
      />
      <h1 className="text-center"></h1>
      <button className="bg-background rounded-lg hover:bg-select transition-colors mt-2">
        Generate Quiz
      </button>
    </form>
  );
}
