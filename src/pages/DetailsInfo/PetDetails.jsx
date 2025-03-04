import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import PetAdoptionModal from "../../components/PetAdoptionModal";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useMyAddedPets from "../../hooks/usemyAddedPets";

const PetDetails = () => {
    const pet = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { myAddedPets } = useMyAddedPets();

    const handleAdoptClick = () => {
        if (myAddedPets.some((p) => p._id === pet._id)) {
            Swal.fire({
                position: "top-end",
                icon: "info",
                title: `You cannot adopt this pet as you added it for adoption.`,
                showConfirmButton: false,
                timer: 1500,
            });
        } else if (user) {
            setShowModal(true);
        } else {
            Swal.fire({
                title: "Login Required",
                text: "You need to login or register to adopt a pet.",
                icon: "warning",
                confirmButtonText: "Go to Login",
                showCancelButton: true,
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card className="dark:bg-gray-800 dark:text-gray-200">
                <img
                    src={pet.photoUrl}
                    alt={pet.name}
                    className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                    <h2 className="text-3xl font-bold mb-4">{pet.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                        <strong>Age:</strong> {pet.age} years
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                        <strong>Category:</strong> {pet.category}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                        <strong>Location:</strong> {pet.location}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        <strong>Short Description:</strong> {pet.shortDescription}
                    </p>
                    <p className="text-gray-800 dark:text-gray-300 mb-4">
                        <strong>Long Description:</strong> {pet.longDescription}
                    </p>

                    <Button onClick={handleAdoptClick} gradientDuoTone="greenToBlue">
                        Adopt {pet.name}
                    </Button>

                    <PetAdoptionModal
                        pet={pet}
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                    />
                </div>
            </Card>
        </div>
    );
};

export default PetDetails;
