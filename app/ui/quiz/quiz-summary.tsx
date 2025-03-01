import { SummaryProps } from "@/app/lib/definitions";

export const QuizSummary: React.FC<SummaryProps> = ({
  correctTotal,
  questionCount,
}) => {
  return (
    <div>
      <h2>{`Quiz Total: ${correctTotal}/${questionCount}`}</h2>
    </div>
  );
};
