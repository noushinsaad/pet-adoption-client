import { Button, Card, Label, Select, TextInput } from "flowbite-react";
import usePetsData from "../../hooks/usePetsData";
import { useState } from "react";

const PetListing = () => {
    const { unAdoptedPets } = usePetsData();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const filteredPets = unAdoptedPets
        .filter((pet) => {
            const matchesName = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory
                ? pet.category === selectedCategory
                : true;
            return matchesName && matchesCategory;
        })
        .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Search and Filter Section */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Search Input */}
                <div className="flex-1">
                    <Label htmlFor="search" value="Search Pets" />
                    <TextInput
                        id="search"
                        type="text"
                        placeholder="Search by pet name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mt-1"
                    />
                </div>

                {/* Category Dropdown */}
                <div className="flex-1">
                    <Label htmlFor="category" value="Filter by Category" />
                    <Select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mt-1"
                    >
                        <option value="">All Categories</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Reptile">Reptile</option>
                        <option value="Other">Other</option>
                    </Select>
                </div>
            </div>

            {/* Pet Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPets.map((pet) => (
                    <Card key={pet._id} className="shadow-md">
                        <div className="h-full">
                            <img
                                src={pet.photoUrl}
                                alt={pet.name}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{pet.name}</h3>
                            <p className="text-gray-600 mb-2">Age: {pet.age} years</p>
                            <p className="text-gray-600 mb-2">Location: {pet.location}</p>
                            <Button
                                gradientDuoTone="greenToBlue"
                            >
                                View Details
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PetListing;