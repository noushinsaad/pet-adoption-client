import { Button, Card } from "flowbite-react";
import dog from '../../../assets/Category/dog.avif'
import cat from '../../../assets/Category/cat.webp'
import bird from '../../../assets/Category/bird.jpg'
import reptile from '../../../assets/Category/reptile.jpg'
import other from '../../../assets/Category/others.jpg'
import rabbit from '../../../assets/Category/rabbit.jpg'


const PetsCategory = () => {

    const onSelectCategory = (value) => {
        console.log(value)
    }

    const categories = [
        { name: "Cats", value: "cat", imageUrl: `${cat}` },
        { name: "Dogs", value: "dog", imageUrl: `${dog}` },
        { name: "Birds", value: "bird", imageUrl: `${bird}` },
        { name: "Reptiles", value: "reptile", imageUrl: `${reptile}` },
        { name: "Rabbits", value: "rabbit", imageUrl: `${rabbit}` },
        { name: "Others", value: "other", imageUrl: `${other}` },
    ];

    return (
        <div className="max-w-5xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg my-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Select a Pet Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <Card
                        key={category.value}
                        className="hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="h-48 w-full object-cover rounded-t-lg"
                        />
                        <h5 className="text-xl font-bold tracking-tight text-gray-900">
                            {category.name}
                        </h5>
                        <Button
                            onClick={() => onSelectCategory(category.value)}
                            // gradientDuoTone="cyanToBlue"
                            className="mt-4 w-full"
                        >
                            Explore {category.name}
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PetsCategory;