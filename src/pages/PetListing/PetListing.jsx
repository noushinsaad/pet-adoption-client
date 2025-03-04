import { Button, Card, Label, Select, TextInput } from "flowbite-react";
import usePetsData from "../../hooks/usePetsData";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const PetListing = () => {
    const { unAdoptedPets } = usePetsData();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredPets, setFilteredPets] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const categoryFromParams = searchParams.get("category");
        if (categoryFromParams) {
            setSelectedCategory(categoryFromParams);
        }
    }, [searchParams]);

    useEffect(() => {
        const pets = unAdoptedPets
            .filter((pet) => {
                const matchesName = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = selectedCategory
                    ? pet.category === selectedCategory
                    : true;
                return matchesName && matchesCategory;
            })
            .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        setFilteredPets(pets);
    }, [unAdoptedPets, searchTerm, selectedCategory]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex-1">
                    <Label htmlFor="search" value="Search Pets" className="text-gray-900 dark:text-gray-200" />
                    <TextInput
                        id="search"
                        type="text"
                        placeholder="Search by pet name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    />
                </div>
                <div className="flex-1">
                    <Label htmlFor="category" value="Filter by Category" className="text-gray-900 dark:text-gray-200" />
                    <Select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mt-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    >
                        <option value="">All Categories</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Reptile">Reptile</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Other">Other</option>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPets.map((pet) => (
                    <Card key={pet._id} className="shadow-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <div className="h-full">
                            <img
                                src={pet.photoUrl}
                                alt={pet.name}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-200">{pet.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">Age: {pet.age} years</p>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">Location: {pet.location}</p>
                            <Link to={`/petDetails/${pet._id}`}>
                                <Button gradientDuoTone="greenToBlue">View Details</Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PetListing;
