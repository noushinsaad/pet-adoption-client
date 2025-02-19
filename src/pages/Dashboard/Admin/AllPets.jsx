import { Button, Table } from "flowbite-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import usePetsData from "../../../hooks/usePetsData";
import { Link } from "react-router-dom";

const AllPets = () => {
    const axiosSecure = useAxiosSecure();
    const { allPets, refetch } = usePetsData();

    const handleChangeAdoptionStatus = async (pet) => {
        await axiosSecure.patch(`/pets/${pet._id}`, { adopt: pet.adopted });
        refetch();
    };

    const handleDeletePet = (pet) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/pets/${pet._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${pet.petName} has been removed from adoption.`,
                        icon: "success",
                    });
                }
            }
        });
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen rounded-lg">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">All Pets</h2>
            <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                <Table striped>
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">#</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">Profile Picture</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">Name</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">Age</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">Category</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">Added By</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">Adoption Status</Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-gray-100">Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y dark:divide-gray-600">
                        {allPets.map((pet, idx) => (
                            <Table.Row
                                key={pet._id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                            >
                                <Table.Cell className="font-medium text-gray-900 dark:text-gray-200">
                                    {idx + 1}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="h-12 w-12">
                                        <img
                                            className="rounded-full w-full h-full object-cover"
                                            src={pet.photoUrl}
                                            alt={pet.name}
                                        />
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="text-gray-700 dark:text-gray-300">{pet.name}</Table.Cell>
                                <Table.Cell className="text-gray-700 dark:text-gray-300">{pet.age}</Table.Cell>
                                <Table.Cell className="text-gray-700 dark:text-gray-300">{pet.category}</Table.Cell>
                                <Table.Cell className="text-gray-700 dark:text-gray-300">{pet.addedBy}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        size="xs"
                                        onClick={() => handleChangeAdoptionStatus(pet)}
                                        className={`${pet.adopted
                                                ? "bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800"
                                                : "bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700"
                                            } text-white transition`}
                                    >
                                        {pet.adopted ? "Adopted" : "Not Adopted"}
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex flex-col md:flex-row gap-2 items-center">
                                        <Button
                                            size="xs"
                                            onClick={() => handleDeletePet(pet)}
                                            className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white"
                                        >
                                            Delete
                                        </Button>
                                        <Link to={`/dashboard/updatePet/${pet._id}`}>
                                            <Button
                                                size="xs"
                                                className="bg-cyan-600 dark:bg-cyan-700 hover:bg-cyan-700 dark:hover:bg-cyan-800 text-white"
                                            >
                                                Update
                                            </Button>
                                        </Link>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default AllPets;
