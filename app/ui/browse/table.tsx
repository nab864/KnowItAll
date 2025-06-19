"use client";
import PlayButton from "@/app/ui/browse/playButton";
import UpdateButton from "../profile/update-button";
import { QuizDef } from "@/app/lib/definitions";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { deleteQuiz } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function BrowseTable({
  quizzes,
  id,
}: {
  quizzes: QuizDef[];
  id?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [questionID, setQuestionID] = useState<string | undefined>();
  const router = useRouter();

  const handleDelete = async () => {
    await deleteQuiz(questionID as string);
    router.refresh()
  };
  return (
    <>
      <table className="rounded-xl min-w-30 bg-component">
        <thead className="">
          <tr>
            <th scope="col" className="px-4">
              Category
            </th>
            <th scope="col" className="px-4">
              Number of Questions
            </th>
          </tr>
        </thead>
        <tbody className="">
          {quizzes?.map((quiz) => (
            <tr
              key={quiz.id}
              className="w-full border-b-2  py-3 hover:bg-select last-of-type:border-none transition-colors"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                {quiz.category}
              </td>
              <td className="px-3 py-3 text-center">{quiz.questions.length}</td>
              <td>
                <PlayButton id={quiz.id as string} />
              </td>
              {id ? (
                <>
                  <td>
                    <UpdateButton id={quiz.id as string} />
                  </td>
                  <td>
                    <button
                      className="rounded-md border p-1.5 hover:bg-main transition-colors"
                      onClick={() => {
                        setOpen(true);
                        setQuestionID(quiz.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 w-screen overflow-y-auto flex min-h-full items-end justify-center p-4 text-center sm:items-center">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-background px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle as="h3" className="text-base font-semibold">
                  Delete Quiz
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-300">
                    Are you sure you want to delete this quiz? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-background px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  handleDelete();
                }}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Delete
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-component px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-select sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
