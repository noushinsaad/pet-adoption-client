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

    const handleViewRequests = (pet) => {
        setSelectedPet(pet);
        setShowModal(true);
    };

    if (isLoading) {
        return (
            <div className="p-6">
                <Skeleton height={40} width={300} count={3} />
            </div>
        );
    }

    return (
        <div className="p-6 dark:bg-gray-800 dark:text-white">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                Adoption Requests Received
            </h2>
            <div className="overflow-x-auto bg-white dark:bg-gray-700 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600">
                <Table striped>
                    <Table.Head className="bg-gray-100 dark:bg-gray-800">
                        <Table.HeadCell className="text-gray-800 dark:text-white">
                            #
                        </Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-white">
                            Pet Information
                        </Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-white">
                            Requests Received
                        </Table.HeadCell>
                        <Table.HeadCell className="text-gray-800 dark:text-white">
                            Actions
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y dark:divide-gray-600">
                        {petsWithRequests.map((pet, idx) => (
                            <Table.Row
                                key={pet._id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-200"
                            >
                                <Table.Cell className="font-medium text-gray-900 dark:text-gray-300">
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
                                            <p className="text-gray-700 dark:text-gray-300 font-semibold">
                                                {pet.name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {pet.category}
                                            </p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <p className="text-gray-700 dark:text-gray-300 font-semibold">
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

            {selectedPet && (
                <RequestAdoptionModal
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                    selectedPet={selectedPet}
                />
            )}
        </div>
    );
};

export default AdoptionRequest;
