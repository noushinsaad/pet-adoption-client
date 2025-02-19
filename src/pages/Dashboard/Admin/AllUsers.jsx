import { Table, Button } from "flowbite-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Success",
                            text: `${user.name} is now an Admin.`,
                            icon: "success",
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "An error occurred.",
                            icon: "error",
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen rounded-lg">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                All Users
            </h2>
            <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                <Table striped>
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">#</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">Profile Picture</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">Name</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">Email</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y dark:divide-gray-600">
                        {users.map((user, idx) => (
                            <Table.Row
                                key={user._id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                            >
                                <Table.Cell className="font-medium text-gray-900 dark:text-gray-200">
                                    {idx + 1}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="h-12 w-12">
                                        <img
                                            className="rounded-full w-full h-full object-cover"
                                            src={user.photoUrl}
                                            alt={user.name}
                                        />
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="text-gray-700 dark:text-gray-300">{user.name}</Table.Cell>
                                <Table.Cell className="text-gray-700 dark:text-gray-300">{user.email}</Table.Cell>
                                <Table.Cell>
                                    {user.role === "admin" ? (
                                        <span className="text-green-600 dark:text-green-400 font-semibold">Admin</span>
                                    ) : (
                                        <Button
                                            size="xs"
                                            onClick={() => handleMakeAdmin(user)}
                                            className="bg-cyan-600 dark:bg-cyan-700 hover:bg-cyan-700 dark:hover:bg-cyan-800 text-white"
                                        >
                                            Make Admin
                                        </Button>
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default AllUsers;
