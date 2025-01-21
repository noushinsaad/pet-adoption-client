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
    }

    const handleDeletePet = pet => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // console.log(result)
                const res = await axiosSecure.delete(`/pets/${pet._id}`)
                if (res.data.deletedCount > 0) {
                    console.log(res.data)
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: `${pet.petName} has been removed from adoption.`,
                        icon: "success"
                    });
                }
            }
        })
    }

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">All Pets</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <Table striped>
                    <Table.Head className="bg-gray-100">
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>Profile Picture</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Age</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Added By</Table.HeadCell>
                        <Table.HeadCell>Adoption Status</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {allPets.map((pet, idx) => (
                            <Table.Row
                                key={pet._id}
                                className="hover:bg-gray-50 transition duration-200"
                            >
                                <Table.Cell className="font-medium text-gray-900">
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
                                <Table.Cell className="text-gray-700">{pet.name}</Table.Cell>
                                <Table.Cell className="text-gray-700">{pet.age}</Table.Cell>
                                <Table.Cell className="text-gray-700">{pet.category}</Table.Cell>
                                <Table.Cell className="text-gray-700">{pet.addedBy}</Table.Cell>
                                <Table.Cell className="text-gray-700">

                                    <Button
                                        size="xs"
                                        onClick={() => handleChangeAdoptionStatus(pet)}
                                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                                    >
                                        {pet.adopted ? "Adopted" : "Not Adopted"}
                                    </Button>

                                </Table.Cell>
                                <Table.Cell >
                                    <div className="flex flex-col md:flex-row gap-2 items-center">
                                        <Button
                                            size="xs"
                                            onClick={() => handleDeletePet(pet)}
                                            className="bg-red-600 text-white"
                                        >
                                            Delete
                                        </Button>
                                        <Link to={`/dashboard/updatePet/${pet._id}`}>
                                            <Button
                                                size="xs"
                                                // onClick={() => handleMakeAdmin(user)}
                                                className="bg-cyan-600 hover:bg-cyan-700 text-white"
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