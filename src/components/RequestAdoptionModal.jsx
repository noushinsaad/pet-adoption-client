/* eslint-disable react/prop-types */
import { Modal, Table, Button } from "flowbite-react";

const RequestAdoptionModal = ({ showModal, onClose, selectedPet, handleAccept, handleReject }) => {


    return (
        <Modal show={showModal} onClose={onClose} size="4xl">
            <Modal.Header>Adoption Requests for {selectedPet?.name}</Modal.Header>
            <Modal.Body>
                {selectedPet?.adoptionRequests?.length > 0 ? (
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>#</Table.HeadCell>
                            <Table.HeadCell>Adopter Name</Table.HeadCell>
                            <Table.HeadCell>Address</Table.HeadCell>
                            <Table.HeadCell>Phone Number</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {selectedPet.adoptionRequests.map((request, idx) => (
                                <Table.Row key={request._id}>
                                    <Table.Cell>{idx + 1}</Table.Cell>
                                    <Table.Cell>{request.adoptionRequestByName}</Table.Cell>
                                    <Table.Cell>{request.address}</Table.Cell>
                                    <Table.Cell>{request.phoneNumber}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex gap-2">
                                            <Button
                                                size="xs"
                                                onClick={() => handleAccept(request)}
                                                className="bg-green-600 text-white"
                                                disabled={selectedPet.adopted}
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
