/* eslint-disable react/prop-types */
import { Button, Label, Modal, TextInput } from "flowbite-react";


const DonationModal = ({ donationCampaign, isModalOpen, toggleModal, donationAmount, setDonationAmount, error, handleDonation }) => {
    return (
        <Modal show={isModalOpen} onClose={toggleModal}>
            <Modal.Header>Donate to {donationCampaign.petName}</Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    <Label htmlFor="donationAmount" value="Donation Amount" />
                    <TextInput
                        id="donationAmount"
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        placeholder="Enter donation amount"
                    />
                    {error && <p className="text-red-500">{error}</p>} 
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button gradientDuoTone="greenToBlue" onClick={handleDonation}>
                    Submit Donation
                </Button>
                <Button color="gray" onClick={toggleModal}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DonationModal;