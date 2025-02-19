import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FileInput, Label, TextInput, Textarea } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${image_hosting_key}`;

const UpdateDonationCampaign = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const quillRef = useRef(null);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchCampaignData = async () => {
            const res = await axiosSecure.get(`/donationsCampaign/${id}`);
            const campaign = res.data;

            setValue("petName", campaign.petName);
            setValue("maxDonationAmount", campaign.maxDonationAmount);
            setValue("lastDateOfDonation", campaign.lastDateOfDonation.split("T")[0]);
            setValue("shortDescription", campaign.shortDescription);
            setValue("longDescription", campaign.longDescription);
            setValue("photoUrl", campaign.petPicture);
        };

        fetchCampaignData();
    }, [id, axiosSecure, setValue]);

    const onSubmit = async (data) => {
        const quill = quillRef.current.getEditor();
        const plainText = quill.getText();

        let petPicture = data.photoUrl;

        if (data.image?.[0]) {
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });
            if (res.data.success) {
                petPicture = res.data.data.display_url;
            }
        }

        const updatedCampaign = {
            petPicture: petPicture,
            maxDonationAmount: data.maxDonationAmount,
            lastDateOfDonation: data.lastDateOfDonation,
            shortDescription: data.shortDescription,
            longDescription: plainText,
        };

        const res = await axiosSecure.patch(`/donationsCampaign/edit/${id}`, updatedCampaign);

        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Donation campaign updated successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
            reset();
            navigate(-1);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update the donation campaign.",
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 dark:bg-gray-900 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-300 mb-6">
                Update Donation Campaign
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Pet Name */}
                <div>
                    <Label htmlFor="petName" value="Pet Name" />
                    <TextInput
                        id="petName"
                        disabled
                        {...register("petName")}
                        shadow
                        className="bg-gray-100 dark:bg-gray-700"
                    />
                </div>

                {/* Pet Image */}
                <div>
                    <img
                        src={watch("photoUrl")}
                        alt={watch("petName")}
                        className="w-1/2 h-72 object-cover rounded-lg mt-2"
                    />
                </div>

                <div>
                    <Label htmlFor="petImage" value="Pet Image" />
                    {watch("photoUrl") ? (
                        <div className="mb-2">
                            <p className="text-gray-700 dark:text-gray-400 text-sm">
                                Current File: {watch("photoUrl").split("/").pop()}
                            </p>
                        </div>
                    ) : null}
                    <FileInput
                        id="petImage"
                        accept="image/*"
                        {...register("image")}
                        className="mt-2"
                    />
                </div>

                {/* Maximum Donation Amount */}
                <div>
                    <Label htmlFor="maxDonationAmount" value="Maximum Donation Amount" />
                    <TextInput
                        id="maxDonationAmount"
                        {...register("maxDonationAmount")}
                        shadow
                    />
                </div>

                {/* Last Date of Donation */}
                <div>
                    <Label htmlFor="lastDateOfDonation" value="Last Date of Donation" />
                    <TextInput
                        id="lastDateOfDonation"
                        type="date"
                        {...register("lastDateOfDonation")}
                        shadow
                    />
                </div>

                {/* Short Description */}
                <div>
                    <Label htmlFor="shortDescription" value="Short Description" />
                    <Textarea
                        id="shortDescription"
                        {...register("shortDescription")}
                        rows={3}
                        shadow
                    />
                </div>

                {/* Long Description */}
                <div>
                    <Label value="Long Description" />
                    <ReactQuill
                        ref={quillRef}
                        value={watch("longDescription")}
                        onChange={(value) =>
                            setValue("longDescription", value, { shouldValidate: true })
                        }
                        placeholder="Provide a detailed description of the donation campaign"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    gradientDuoTone="cyanToBlue"
                    className="w-full"
                >
                    Update
                </Button>
            </form>
        </div>
    );
};

export default UpdateDonationCampaign;
