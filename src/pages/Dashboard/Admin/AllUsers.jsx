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

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Succeed",
                                text: `${user.name} is a Admin Now`,
                                icon: "success"
                            });
                        }
                        else {
                            Swal.fire({
                                title: "Error",
                                text: `error occurred`,
                                icon: "error"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">All Users</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <Table striped>
                    <Table.Head className="bg-gray-100">
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>Profile Picture</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {users.map((user, idx) => (
                            <Table.Row
                                key={user._id}
                                className="hover:bg-gray-50 transition duration-200"
                            >
                                <Table.Cell className="font-medium text-gray-900">
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
                                <Table.Cell className="text-gray-700">{user.name}</Table.Cell>
                                <Table.Cell className="text-gray-700">{user.email}</Table.Cell>
                                <Table.Cell>
                                    {user.role === 'admin' ? 'Admin' :
                                        <Button
                                            size="xs"
                                            onClick={() => handleMakeAdmin(user)}
                                            className="bg-cyan-600 hover:bg-cyan-700 text-white"
                                        >
                                            Make Admin
                                        </Button>}
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
