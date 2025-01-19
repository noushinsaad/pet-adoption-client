import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import PetsCategory from "../PetsCategory/PetsCategory";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PetsCategory></PetsCategory>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;