import { useForm } from "react-hook-form";
import { Button, FileInput, Label, TextInput, Textarea } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useRef } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${image_hosting_key}`;

const CreateDonationCampaign = () => {
    const quillRef = useRef(null);
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);

        const quill = quillRef.current.getEditor();
        const plainText = quill.getText();

        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        if (res.data.success) {
            const donationInfo = {
                petPicture: res.data.data.display_url,
                petName: data.petName,
                lastDateOfDonation: data.lastDateOfDonation,
                shortDescription: data.shortDescription,
                maxDonationAmount: data.maxDonationAmount,
                longDescription: plainText,
                createdBy: user?.email,
                createdCampaignAt: new Date().toISOString(),
            };

            const donationRes = await axiosSecure.post(
                "/donationsCampaign",
                donationInfo
            );

            if (donationRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Donation Campaign for ${data.petName} is created successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    return (
        <div className="py-6">
            <div className="max-w-4xl mx-auto p-8 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
                    Create a Donation Campaign for a Pet!!
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Pet Image */}
                    <div>
                        <Label
                            htmlFor="petImage"
                            value="Pet Image"
                            className="text-gray-800 dark:text-gray-200"
                        />
                        <FileInput
                            id="petImage"
                            accept="image/*"
                            {...register("image", {
                                required: "Pet picture is required",
                                validate: {
                                    isImage: (fileList) => {
                                        const file = fileList?.[0];
                                        if (!file) return "Please upload an image.";
                                        const validTypes = [
                                            "image/jpeg",
                                            "image/png",
                                            "image/jpg",
                                        ];
                                        if (!validTypes.includes(file.type)) {
                                            return "Only JPEG, PNG, or JPG files are allowed.";
                                        }
                                        return true;
                                    },
                                },
                            })}
                            className="mt-2"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.image.message}
                            </p>
                        )}
                    </div>

                    {/* Pet Name */}
                    <div>
                        <Label
                            htmlFor="petName"
                            value="Pet Name"
                            className="text-gray-800 dark:text-gray-200"
                        />
                        <TextInput
                            {...register("petName", {
                                required: "Pet name is required",
                            })}
                            id="petName"
                            placeholder="Enter the pet's name"
                            shadow
                            className="dark:bg-gray-700 dark:text-gray-200"
                        />
                        {errors.petName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.petName.message}
                            </p>
                        )}
                    </div>

                    {/* Maximum Donation Amount */}
                    <div>
                        <Label
                            htmlFor="maxDonationAmount"
                            value="Maximum Donation Amount"
                            className="text-gray-800 dark:text-gray-200"
                        />
                        <TextInput
                            {...register("maxDonationAmount", {
                                required: "Maximum donation amount is required",
                            })}
                            id="maxDonationAmount"
                            type="number"
                            placeholder="Enter the maximum donation amount"
                            shadow
                            className="dark:bg-gray-700 dark:text-gray-200"
                        />
                        {errors.maxDonationAmount && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.maxDonationAmount.message}
                            </p>
                        )}
                    </div>

                    {/* Last Date of Donation */}
                    <div>
                        <Label
                            htmlFor="lastDateOfDonation"
                            value="Last Date of Donation"
                            className="text-gray-800 dark:text-gray-200"
                        />
                        <TextInput
                            {...register("lastDateOfDonation", {
                                required: "Last donation date is required",
                                validate: {
                                    futureDate: (value) => {
                                        const selectedDate = new Date(value);
                                        const currentDate = new Date();
                                        if (selectedDate <= currentDate) {
                                            return "Please select a future date.";
                                        }
                                        return true;
                                    },
                                },
                            })}
                            id="lastDateOfDonation"
                            type="date"
                            placeholder="Select the last date of donation"
                            shadow
                            className="dark:bg-gray-700 dark:text-gray-200"
                        />
                        {errors.lastDateOfDonation && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.lastDateOfDonation.message}
                            </p>
                        )}
                    </div>

                    {/* Short Description */}
                    <div>
                        <Label
                            htmlFor="shortDescription"
                            value="Short Description"
                            className="text-gray-800 dark:text-gray-200"
                        />
                        <Textarea
                            {...register("shortDescription", {
                                required: "Short description is required",
                            })}
                            id="shortDescription"
                            placeholder="Provide a brief description"
                            rows={3}
                            shadow
                            className="dark:bg-gray-700 dark:text-gray-200"
                        />
                        {errors.shortDescription && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.shortDescription.message}
                            </p>
                        )}
                    </div>

                    {/* Long Description */}
                    <div>
                        <Label
                            htmlFor="longDescription"
                            value="Long Description"
                            className="text-gray-800 dark:text-gray-200"
                        />
                        <ReactQuill
                            ref={quillRef}
                            value={watch("longDescription")}
                            onChange={(value) =>
                                setValue("longDescription", value, {
                                    shouldValidate: true,
                                })
                            }
                            placeholder="Provide a detailed description of the pet"
                            className="dark:bg-gray-700 dark:text-gray-200"
                        />
                        {errors.longDescription && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.longDescription.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        gradientDuoTone="cyanToBlue"
                        className="w-full dark:bg-cyan-700 dark:text-gray-200"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateDonationCampaign;
