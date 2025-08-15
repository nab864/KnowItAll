export function TableRowSkeleton() {
  return (
    <tr className="border-b-2 last-of-type:border-none bg-gray-400 motion-safe:animate-pulse last:bg-transparent">
      <td className="py-1 w-2/5">
        <div className="h-10"></div>
      </td>
      <td>
        <div className="h-10 w-2/5"></div>
      </td>
      <td>
        <div className="h-12 text-transparent">65856666666</div>
      </td>
    </tr>
  );
}

export function BrowseTableSkeleton(){

  return (
    <table className="rounded-xl bg-component sm:w-1/3">
      <thead className="">
        <tr>
          <th scope="col" className="text-transparent">
            Category
          </th>
          <th scope="col" className="sm:w-auto sm:px-4 text-transparent">
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
        <TableRowSkeleton />
      </tbody>
    </table>
  );
}
