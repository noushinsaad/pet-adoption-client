import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import dog from '../../../assets/Category/dog.avif';
import cat from '../../../assets/Category/cat.webp';
import bird from '../../../assets/Category/bird.jpg';
import reptile from '../../../assets/Category/reptile.jpg';
import other from '../../../assets/Category/others.jpg';
import rabbit from '../../../assets/Category/rabbit.jpg';

const PetsCategory = () => {
    const navigate = useNavigate();

    const onSelectCategory = (value) => {
        navigate(`/petListing?category=${value}`);
    };

    const categories = [
        { name: "Cats", value: "Cat", imageUrl: `${cat}` },
        { name: "Dogs", value: "Dog", imageUrl: `${dog}` },
        { name: "Birds", value: "Bird", imageUrl: `${bird}` },
        { name: "Reptiles", value: "Reptile", imageUrl: `${reptile}` },
        { name: "Rabbits", value: "Rabbit", imageUrl: `${rabbit}` },
        { name: "Others", value: "Other", imageUrl: `${other}` },
    ];

    return (
        <div className="dark:bg-gray-900 py-8">
            <div className="max-w-5xl mx-auto p-8 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
                    Pick Your Favorite Category
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <Card
                            key={category.value}
                            className="hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                        >
                            <img
                                src={category.imageUrl}
                                alt={category.name}
                                className="h-48 w-full object-cover rounded-t-lg"
                            />
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                                {category.name}
                            </h5>
                            <Button
                                onClick={() => onSelectCategory(category.value)}
                                className="mt-4 w-full dark:text-white dark:hover:bg-green-700"
                            >
                                Explore {category.name}
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PetsCategory;