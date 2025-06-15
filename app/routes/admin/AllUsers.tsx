import { useQuery } from "@tanstack/react-query";
import { Header } from "components";
import useAxiosSecure from "src/hook/useAxiosSecure";
import { cn } from "~/lib/utils";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  return (
    <main className="all-users wrapper">
      <Header
        title={`Manage Users`}
        subtitle={`Filter, Sort, Access detailed users profiles`}
      />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-gray-500">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date Joined</th>
              <th>Trip Created</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user: UserData, idx: any) => (
              <tr key={user._id}>
                <th className="text-gray-500">{idx+1}</th>
                <td className="flex items-center gap-2">
                  <img src={user.photoURL} className="size-8 rounded-full" alt={user.name}  />
                  {user.name}
                </td>
                <td>{user.email}</td>
                <td>{user.joinedAt}</td>
                <td>{user.tripCreated}</td>
                <td>
                  <article
                    className={cn(
                      "status-column",
                      user.role === "user"
                        ? "bg-success-50 text-green-800"
                        : "bg-light-300 text-red-800"
                    )}
                  >
                    <div
                      className={cn(
                        "size-1.5 rounded-full",
                        user.role === "user"
                          ? "bg-success-500"
                          : "bg-gray-500"
                      )}
                    />
                    <h3
                      className={cn(
                        "font-inter text-xs font-medium",
                        user.role === "user"
                          ? "text-success-700"
                          : "text-gray-500"
                      )}
                    >
                      {user.role}
                    </h3>
                  </article>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AllUsers;
