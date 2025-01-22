import { useState } from "react";
import { Button, Table } from "flowbite-react";
import useMyPetsWithRequests from "../../../hooks/usePetsWithRequest";
import RequestAdoptionModal from "../../../components/RequestAdoptionModal";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';




const AdoptionRequest = () => {
    const { petsWithRequests, isLoading } = useMyPetsWithRequests();

    const [selectedPet, setSelectedPet] = useState(null);

    const [showModal, setShowModal] = useState(false);

    // console.log(petsWithRequests)

    const handleViewRequests = (pet) => {
        setSelectedPet(pet)
        setShowModal(true);
    };



    if (isLoading) {
        return (<div className="p-6">
            <Skeleton height={40} width={300} count={3} />
        </div>)
    }

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Adoption Requests Received</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <Table striped>
                    <Table.Head className="bg-gray-100">
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>Pet Information</Table.HeadCell>
                        <Table.HeadCell>Requests Received</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {petsWithRequests.map((pet, idx) => (
                            <Table.Row key={pet._id} className="hover:bg-gray-50 transition duration-200">
                                <Table.Cell className="font-medium text-gray-900">
                                    {idx + 1}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center gap-4">
                                        <img
                                            className="h-12 w-12 rounded-full object-cover"
                                            src={pet.photoUrl}
                                            alt={pet.name}
                                        />
                                        <div>
                                            <p className="text-gray-700 font-semibold">{pet.name}</p>
                                            <p className="text-sm text-gray-500">{pet.category}</p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <p className="text-gray-700 font-semibold">
                                        {pet.requestCount} request(s)
                                    </p>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        size="xs"
                                        onClick={() => handleViewRequests(pet)}
                                        className="bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        View Requests
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            {selectedPet && <RequestAdoptionModal
                showModal={showModal}
                onClose={() => setShowModal(false)}
                selectedPet={selectedPet}
            />}
        </div>
    );
};

export default AdoptionRequest;
