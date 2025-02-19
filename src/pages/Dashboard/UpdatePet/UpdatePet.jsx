import { useForm } from "react-hook-form";
import { Button, FileInput, Label, TextInput, Textarea } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${image_hosting_key}`;

const UpdatePet = () => {
    const { id } = useParams();
    const quillRef = useRef(null);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchPetData = async () => {
            const res = await axiosSecure.get(`/pets/${id}`);
            const pet = res.data;

            setValue("petName", pet.name);
            setValue("petAge", pet.age);
            setValue("petLocation", pet.location);
            setValue("shortDescription", pet.shortDescription);
            setValue("longDescription", pet.longDescription);
            setValue("petCategory", pet.category);
            setValue("photoUrl", pet.photoUrl);
        };

        fetchPetData();
    }, [axiosSecure, id, setValue]);

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

        const updatedPetInfo = {
            age: data.petAge,
            location: data.petLocation,
            shortDescription: data.shortDescription,
            photoUrl: petPicture,
            longDescription: plainText,
        };

        try {
            const petRes = await axiosSecure.patch(`/pets/user/${id}`, updatedPetInfo);
            if (petRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Pet information updated successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
                navigate(-1)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Failed to update pet information ${error}.`,
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 dark:bg-gray-900 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-300 mb-6">
                Update Pet Information
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Pet Image */}
                <div>
                    <img
                        src={watch("photoUrl")}
                        alt="Pet"
                        className="w-1/2 h-72 object-cover rounded-lg"
                    />
                </div>

                <div>
                    <Label htmlFor="petImage" value="Pet Image" />
                    {watch("photoUrl") ? (
                        <div className="mb-2">
                            <p className="text-gray-700 dark:text-gray-400 text-sm">Current File: {watch("photoUrl").split('/').pop()}</p>
                        </div>
                    ) : null}
                    <FileInput
                        id="petImage"
                        accept="image/*"
                        {...register("image", {
                            validate: {
                                isImage: (fileList) => {
                                    const file = fileList?.[0];
                                    if (!file) return true;
                                    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
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
                        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                    )}
                </div>

                {/* Pet Name */}
                <div>
                    <Label value="Pet Name" />
                    <TextInput
                        value={watch("petName")}
                        readOnly
                        shadow
                        className="bg-gray-100 dark:bg-gray-700"
                    />
                </div>

                {/* Pet Category */}
                <div>
                    <Label value="Pet Category" />
                    <TextInput
                        value={watch("petCategory")}
                        readOnly
                        shadow
                        className="bg-gray-100 dark:bg-gray-700"
                    />
                </div>

                {/* Pet Age */}
                <div>
                    <Label htmlFor="petAge" value="Pet Age (Years)" />
                    <TextInput
                        {...register("petAge", {
                            required: "Pet age is required",
                            valueAsNumber: true,
                            min: 1,
                        })}
                        id="petAge"
                        type="number"
                        placeholder="Enter the pet's age"
                        shadow
                    />
                    {errors.petAge && (
                        <p className="text-red-500 text-sm mt-1">{errors.petAge.message}</p>
                    )}
                </div>

                {/* Pet Location */}
                <div>
                    <Label htmlFor="petLocation" value="Pet Location" />
                    <TextInput
                        {...register("petLocation", { required: "Pet location is required" })}
                        id="petLocation"
                        placeholder="Enter the pet's location"
                        shadow
                    />
                    {errors.petLocation && (
                        <p className="text-red-500 text-sm mt-1">{errors.petLocation.message}</p>
                    )}
                </div>

                {/* Short Description */}
                <div>
                    <Label htmlFor="shortDescription" value="Short Description" />
                    <Textarea
                        {...register("shortDescription", { required: "Short description is required" })}
                        id="shortDescription"
                        placeholder="Provide a brief description"
                        rows={3}
                        shadow
                    />
                    {errors.shortDescription && (
                        <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>
                    )}
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
                        placeholder="Provide a detailed description of the pet"
                    />
                    {errors.longDescription && (
                        <p className="text-red-500 text-sm mt-1">{errors.longDescription.message}</p>
                    )}
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

export default UpdatePet;
