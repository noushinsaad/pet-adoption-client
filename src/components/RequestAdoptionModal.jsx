/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal, Table, Button } from "flowbite-react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAdoptionRequestData from "../hooks/useAdoptionRequestData";
import useMyAddedPets from "../hooks/usemyAddedPets";

const RequestAdoptionModal = ({ showModal, onClose, selectedPet }) => {
    const axiosSecure = useAxiosSecure();
    const { adoptionRequests, refetch } = useAdoptionRequestData();
    const matchedRequests = adoptionRequests.filter(request => request.petId === selectedPet._id);

    const handleAccept = async (request) => {
        try {
            await axiosSecure.patch(`/pets/${request.petId}`);
            await axiosSecure.patch(`/adoptionRequest/${request._id}`, { isAccepted: true });
            refetch();

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "The adoption request has been accepted!",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong while accepting the request.",
            });
        }
    };

    const handleReject = async (request) => {
        await axiosSecure.delete(`/adoptionRequest/${request._id}`);

        refetch();


        Swal.fire({
            icon: "success",
            title: "Success",
            text: "The adoption request has been rejected!",
        });

    };

    return (
        <Modal show={showModal} onClose={onClose} size="4xl">
            <Modal.Header>Adoption Requests for {selectedPet?.name}</Modal.Header>
            <Modal.Body>
                {selectedPet?.requestCount > 0 ? (
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>#</Table.HeadCell>
                            <Table.HeadCell>Adopter Name</Table.HeadCell>
                            <Table.HeadCell>Address</Table.HeadCell>
                            <Table.HeadCell>Phone Number</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {matchedRequests.map((request, idx) => (
                                <Table.Row key={request._id}>
                                    <Table.Cell>{idx + 1}</Table.Cell>
                                    <Table.Cell>{request?.adoptionRequestByName}</Table.Cell>
                                    <Table.Cell>{request?.address}</Table.Cell>
                                    <Table.Cell>{request?.phoneNumber}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex gap-2">
                                            <Button
                                                size="xs"
                                                onClick={() => handleAccept(request)}
                                                className="bg-green-600 text-white"
                                                disabled={selectedPet.adopt || request.isAccepted}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                size="xs"
                                                onClick={() => handleReject(request)}
                                                className="bg-red-600 text-white"
                                                disabled={(request.isAccepted === false || request.isAccepted === undefined) && selectedPet.adopted}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                ) : (
                    <p className="text-center text-gray-600">No adoption requests found.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RequestAdoptionModal;
