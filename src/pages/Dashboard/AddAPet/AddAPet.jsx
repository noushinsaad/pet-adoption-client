import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${image_hosting_key}`;

const AddPetForm = () => {
    const { register, handleSubmit, setValue, control, watch, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic()

    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': "multipart/form-data"
            }
        })
        console.log(res)
        const photoUrl = res.data.data.display_url;
        // const petData = {
        //     ...data,
        //     imageUrl,
        //     dateAdded: new Date().toISOString(),
        // };

        console.log(data, photoUrl);
    };


    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Add a Pet for Adoption
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Pet Image */}
                <div>
                    <label htmlFor="petImage" className="block text-gray-700 font-semibold mb-2">
                        Pet Image
                    </label>
                    <input
                        type="file"
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
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                    )}
                </div>


                {/* Pet Name */}
                <div>
                    <label htmlFor="petName" className="block text-gray-700 font-semibold mb-2">
                        Pet Name
                    </label>
                    <input
                        {...register("petName", { required: "Pet name is required" })}
                        type="text"
                        placeholder="Enter the pet's name"
                        className="w-full border rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-200"
                    />
                    {errors.petName && (
                        <div className="text-red-500 text-sm mt-1">{errors.petName.message}</div>
                    )}
                </div>

                {/* Pet Age */}
                <div>
                    <label htmlFor="petAge" className="block text-gray-700 font-semibold mb-2">
                        Pet Age (Years)
                    </label>
                    <input
                        {...register("petAge", {
                            required: "Pet age is required",
                            valueAsNumber: true,
                            min: 1,
                        })}
                        type="number"
                        placeholder="Enter the pet's age"
                        className="w-full border rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-200"
                    />
                    {errors.petAge && (
                        <div className="text-red-500 text-sm mt-1">{errors.petAge.message}</div>
                    )}
                </div>

                {/* Pet Category */}
                <div>
                    <label htmlFor="petCategory" className="block text-gray-700 font-semibold mb-2">
                        Pet Category
                    </label>
                    <Controller
                        name="petCategory"
                        control={control}
                        rules={{ required: "Pet category is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={[
                                    { value: "dog", label: "Dog" },
                                    { value: "cat", label: "Cat" },
                                    { value: "bird", label: "Bird" },
                                    { value: "reptile", label: "Reptile" },
                                    { value: "other", label: "Other" },
                                ]}
                                onChange={(option) => field.onChange(option.value)}
                                placeholder="Select a category"
                            />
                        )}
                    />
                    {errors.petCategory && (
                        <div className="text-red-500 text-sm mt-1">{errors.petCategory.message}</div>
                    )}
                </div>

                {/* Pet Location */}
                <div>
                    <label htmlFor="petLocation" className="block text-gray-700 font-semibold mb-2">
                        Pet Location
                    </label>
                    <input
                        {...register("petLocation", { required: "Pet location is required" })}
                        type="text"
                        placeholder="Enter the pet's location"
                        className="w-full border rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-200"
                    />
                    {errors.petLocation && (
                        <div className="text-red-500 text-sm mt-1">{errors.petLocation.message}</div>
                    )}
                </div>

                {/* Short Description */}
                <div>
                    <label
                        htmlFor="shortDescription"
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        Short Description
                    </label>
                    <input
                        {...register("shortDescription", { required: "Short description is required" })}
                        type="text"
                        placeholder="Provide a brief description"
                        className="w-full border rounded-lg p-3 text-gray-700 focus:ring focus:ring-blue-200"
                    />
                    {errors.shortDescription && (
                        <div className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</div>
                    )}
                </div>

                {/* Long Description */}
                <div>
                    <label
                        htmlFor="longDescription"
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        Long Description
                    </label>
                    <ReactQuill
                        value={watch("longDescription")}
                        onChange={(value) =>
                            setValue("longDescription", value, { shouldValidate: true })
                        }
                        placeholder="Provide a detailed description of the pet"
                    />
                    {errors.longDescription && (
                        <div className="text-red-500 text-sm mt-1">{errors.longDescription.message}</div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddPetForm;
