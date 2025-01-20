/* eslint-disable react/prop-types */
import { Modal, Label, TextInput, Button, Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const PetAdoptionModal = ({ pet, showModal, onClose }) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        const adoptionData = {
            ...data,
            adoptionRequestByName: user?.displayName,
            adoptionRequestByEmail: user?.email,
            petId: pet._id,
            petName: pet.name,
            petImage: pet.photoUrl,
            submittedAt: new Date().toISOString(),
        };

        try {
            const adoptionDoc = await axiosSecure.post('/adoptionRequest', adoptionData);

            if (adoptionDoc.data.success) {

                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Adoption request submitted for ${pet.name}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: adoptionDoc.data.message, 
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something went wrong. Please try again.",
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <Modal show={showModal} onClose={onClose}>
            <Modal.Header>
                <h2 className="text-xl font-bold text-gray-800">Adopt {pet.name}</h2>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* pet name */}
                    <div>
                        <Label htmlFor="petName" value="Pet Name" />
                        <TextInput
                            id="petName"
                            value={pet.name}
                            disabled
                            readOnly
                            className="mt-1"
                        />
                    </div>

                    {/* User Name */}
                    <div>
                        <Label htmlFor="userName" value="Your Name" />
                        <TextInput
                            id="userName"
                            value={user?.displayName || "Anonymous"}
                            disabled
                            readOnly
                            className="mt-1"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email" value="Your Email" />
                        <TextInput
                            id="email"
                            value={user?.email || ""}
                            disabled
                            readOnly
                            className="mt-1"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <Label htmlFor="phoneNumber" value="Phone Number" />
                        <TextInput
                            id="phoneNumber"
                            type="tel"
                            placeholder="Enter your phone number"
                            {...register("phoneNumber", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10,15}$/,
                                    message: "Invalid phone number format",
                                },
                            })}
                            className="mt-1"
                        />
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <Label htmlFor="address" value="Address" />
                        <Textarea
                            id="address"
                            placeholder="Enter your address"
                            {...register("address", { required: "Address is required" })}
                            className="mt-1"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="text-right">
                        <Button gradientDuoTone="greenToBlue" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default PetAdoptionModal;
