/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import useDonations from "../hooks/useDonations";

// Initialize Stripe with your publishable key (replace with your actual key)
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const DonationModal = ({ donationCampaign, isModalOpen, toggleModal, donationAmount, setDonationAmount }) => {
    const stripe = useStripe();
    const axiosSecure = useAxiosSecure();
    const [err, setErr] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const elements = useElements();
    // const [donation, refetch] = useDonations();
    const [transactionId, setTransactionId] = useState('')
    const { user } = useAuth();
    const navigate = useNavigate()

    // console.log("Donation", donation)

    useEffect(() => {
        if (donationAmount > 0) {
            axiosSecure.post('/create-payment-intent', { amount: donationAmount })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, donationAmount])

    const handleStripeDonation = async () => {
        if (donationAmount > donationCampaign.maxDonationAmount) {
            setErr(`Donation amount cannot exceed ${donationCampaign.maxDonationAmount}`);
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error)
            setErr(error.message)
        }
        else {
            console.log('payment method', paymentMethod)
            setErr('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })

        if (confirmError) {
            console.log("confirm error", confirmError.message)
        }
        else {
            console.log("Payment Intent", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id:', paymentIntent.id)
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const donation = {
                    email: user.email,
                    amount: donationAmount,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    donationFor: donationCampaign.petName,
                    donationCampaignId: donationCampaign._id
                }


                const res = await axiosSecure.post('/donations', donation)
                const response = await axiosSecure.put(`/donationsCampaign/${donationCampaign._id}`, { currentDonations: donationAmount })
                // console.log('payment saved', res.data);
                // refetch()
                if (res.data?.donationResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${donationAmount}$ has been paid`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/userHome')
                }
            }
        }
    };

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
                    <p className="text-red-600">{err}</p>
                    {
                        transactionId &&
                        <p className="text-green-500">Your Transaction ID: {transactionId}</p>
                    }

                    <CardElement options={{ hidePostalCode: true }} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    gradientDuoTone="greenToBlue"
                    onClick={handleStripeDonation}
                    disabled={!stripe || !clientSecret}
                >

                </Button>
                <Button color="gray" onClick={toggleModal}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

// Wrap DonationModal with Elements to provide Stripe context
const DonationModalWithStripe = (props) => (
    <Elements stripe={stripePromise}>
        <DonationModal {...props} />
    </Elements>
);

export default DonationModalWithStripe;
