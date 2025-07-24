export function TableRowSkeleton() {
  return (
    <tr className="border-b py-3 last-of-type:border-none">
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="w-[15ch] h-[2rem] bg-select motion-safe:animate-pulse rounded"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="w-[4ch] h-[2rem] bg-select motion-safe:animate-pulse rounded ml-20"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="w-[4ch] h-[2rem] bg-select motion-safe:animate-pulse rounded"></div>
      </td>
    </tr>
  );
}

export function BrowseTableSkeleton() {
  return (
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
  );
}
