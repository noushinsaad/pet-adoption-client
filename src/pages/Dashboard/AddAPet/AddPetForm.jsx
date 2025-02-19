import { useForm, Controller } from "react-hook-form";
import { Button, FileInput, Label, TextInput, Textarea } from "flowbite-react";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useRef } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${image_hosting_key}`;

const AddPetForm = () => {
    const quillRef = useRef(null);
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const quill = quillRef.current.getEditor();
        const plainText = quill.getText();

        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        if (res.data.success) {
            const petInfo = {
                name: data.petName,
                age: data.petAge,
                location: data.petLocation,
                shortDescription: data.shortDescription,
                category: data.petCategory,
                longDescription: plainText,
                photoUrl: res.data.data.display_url,
                addedAt: new Date().toISOString(),
                adopted: false,
                addedBy: user?.email
            };
            const petDoc = await axiosSecure.post('/pets', petInfo);
            if (petDoc.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.petName} is added for adoption successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <div className="py-6">
            <div className="max-w-4xl mx-auto p-8 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
                    Add a Pet for Adoption
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Pet Image */}
                    <div>
                        <Label htmlFor="petImage" value="Pet Image" className="text-gray-800 dark:text-gray-200" />
                        <FileInput
                            id="petImage"
                            accept="image/*"
                            {...register("image", {
                                required: "Pet picture is required",
                                validate: {
                                    isImage: (fileList) => {
                                        const file = fileList?.[0];
                                        if (!file) return "Please upload an image.";
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
                        <Label htmlFor="petName" value="Pet Name" className="text-gray-800 dark:text-gray-200" />
                        <TextInput
                            {...register("petName", { required: "Pet name is required" })}
                            id="petName"
                            placeholder="Enter the pet's name"
                            shadow
                            className="dark:bg-gray-700 dark:text-gray-200"
                        />
                        {errors.petName && (
                            <p className="text-red-500 text-sm mt-1">{errors.petName.message}</p>
                        )}
                    </div>

                    {/* Pet Age */}
                    <div>
                        <Label htmlFor="petAge" value="Pet Age (Years)" className="text-gray-800 dark:text-gray-200" />
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
                            className="dark:bg-gray-700 dark:text-gray-200"
                        />
                        {errors.petAge && (
                            <p className="text-red-500 text-sm mt-1">{errors.petAge.message}</p>
                        )}
                    </div>

                    {/* Pet Category */}
                    <div>
                        <Label htmlFor="petCategory" value="Pet Category" className="text-gray-800 dark:text-gray-200" />
                        <Controller
                            name="petCategory"
                            control={control}
                            rules={{ required: "Pet category is required" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    value={field.value ? { value: field.value, label: field.value.charAt(0).toUpperCase() + field.value.slice(1) } : null}
                                    options={[
                                        { value: "Dog", label: "Dog" },
                                        { value: "Cat", label: "Cat" },
                                        { value: "Bird", label: "Bird" },
                                        { value: "Rabbit", label: "Rabbit" },
                                        { value: "Reptile", label: "Reptile" },
                                        { value: "Other", label: "Other" },
                                    ]}
                                    onChange={(option) => field.onChange(option.value)}
                                    placeholder="Select a category"
                                    className="dark:bg-gray-700 dark:text-gray-200"
                                />
                            )}
                        />
                        {errors.petCategory && (
                            <p className="text-red-500 text-sm mt-1">{errors.petCategory.message}</p>
                        )}
                    </div>

                    {/* Pet Location */}
                    <div>
                        <Label htmlFor="petLocation" value="Pet Location" className="text-gray-800 dark:text-gray-200" />
                        <TextInput
                            {...register("petLocation", { required: "Pet location is required" })}
                            id="petLocation"
                            placeholder="Enter the pet's location"
                            shadow
                            className="dark:bg-gray-700 dark:text-gray-200"
                        />
                        {errors.petLocation && (
                            <p className="text-red-500 text-sm mt-1">{errors.petLocation.message}</p>
                        )}
                    </div>

                    {/* Short Description */}
                    <div>
                        <Label htmlFor="shortDescription" value="Short Description" className="text-gray-800 dark:text-gray-200" />
                        <Textarea
                            {...register("shortDescription", { required: "Short description is required" })}
                            id="shortDescription"
                            placeholder="Provide a brief description"
                            rows={3}
                            shadow
                            className="dark:bg-gray-700 dark:text-gray-200"
                        />
                        {errors.shortDescription && (
                            <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>
                        )}
                    </div>

                    {/* Long Description */}
                    <div>
                        <Label htmlFor="longDescription" value="Long Description" className="text-gray-800 dark:text-gray-200" />
                        <ReactQuill
                            ref={quillRef}
                            value={watch("longDescription")}
                            onChange={(value) => setValue("longDescription", value, { shouldValidate: true })}
                            placeholder="Provide a detailed description of the pet"
                            className="dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" gradientDuoTone="cyanToBlue" className="w-full dark:bg-cyan-700 dark:text-gray-200">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddPetForm;
