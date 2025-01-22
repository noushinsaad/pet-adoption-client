/* eslint-disable react/prop-types */
import { Modal, Table, Button, Spinner } from "flowbite-react";

const ShowDonatorsModal = ({ showModal, onClose, donators, selectedCampaign, isModalLoading }) => {
    return (
        <Modal show={showModal} size="4xl" onClose={onClose}>
            <Modal.Header>Donators for Campaign: {selectedCampaign?.petName || "N/A"}</Modal.Header>
            <Modal.Body>
                {isModalLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spinner size="lg" aria-label="Loading spinner" />
                    </div>
                ) : donators.length > 0 ? (
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>#</Table.HeadCell>
                            <Table.HeadCell>Donator Email</Table.HeadCell>
                            <Table.HeadCell>Donation Amount</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {donators.map((donator, idx) => (
                                <Table.Row key={donator._id}>
                                    <Table.Cell>{idx + 1}</Table.Cell>
                                    <Table.Cell>{donator.email}</Table.Cell>
                                    <Table.Cell>{donator.amount} $</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                ) : (
                    <p className="text-center text-gray-600">No donators found.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ShowDonatorsModal;
