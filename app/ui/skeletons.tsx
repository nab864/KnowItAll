export function TableRowSkeleton() {
  return (
    <tr className="border-b py-3 last-of-type:border-none">
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="w-[15ch] h-[2rem] bg-purple-600 motion-safe:animate-pulse rounded"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="w-[4ch] h-[2rem] bg-purple-600 motion-safe:animate-pulse rounded ml-20"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="w-[4ch] h-[2rem] bg-purple-600 motion-safe:animate-pulse rounded"></div>
      </td>
    </tr>
  );
}

export function BrowseTableSkeleton() {
  return (
    <div>
      <table className="border rounded-xl min-w-40 bg-white">
        <thead className="text-left">
          <tr>
            <th scope="col" className="px-4 py-8">
            <div className="w-[8ch] h-[2rem] bg-purple-600 motion-safe:animate-pulse rounded"></div>
            </th>
            <th scope="col" className="px-4 py-5">
            <div className="w-[18ch] h-[2rem] bg-purple-600 motion-safe:animate-pulse rounded"></div>
            </th>
          </tr>
        </thead>
        <tbody className="">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </tbody>
      </table>
    </div>
  );
}
