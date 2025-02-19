/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import ContactUs from "../ContactUs/ContactUs";
import DonateNow from "../DonateNow/DonateNow";
import PetCareTips from "../PetCareTips/PetCareTips";
import PetsCategory from "../PetsCategory/PetsCategory";
import WhyAdopt from "../WhyAdopt/WhyAdopt";



const Home = ({title}) => {
    return (
        <div>
            <Helmet>
                <title>{title || "Home | furEverHome"}</title>
            </Helmet>

            <Banner></Banner>
            <PetsCategory></PetsCategory>
            <CallToAction></CallToAction>
            <DonateNow></DonateNow>
            <PetCareTips></PetCareTips>
            <WhyAdopt></WhyAdopt>
            <AboutUs></AboutUs>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;