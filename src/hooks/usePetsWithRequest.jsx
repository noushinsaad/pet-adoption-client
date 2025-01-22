import useMyAddedPets from "./usemyAddedPets";
import useAdoptionRequestData from "./useAdoptionRequestData";

const useMyPetsWithRequests = () => {
    const { myAddedPets, isLoading: petsLoading } = useMyAddedPets();

    const { adoptionRequests, requestsLoading } = useAdoptionRequestData();

    const petsWithRequests = myAddedPets.map(pet => {
        const matchedRequests = adoptionRequests.filter(request => request.petId === pet._id);
        return {
            ...pet,
            requestCount: matchedRequests.length,
        };
    });

    const totalRequestCount = petsWithRequests.reduce((total, pet) => total + pet.requestCount, 0);

    const isLoading = petsLoading || requestsLoading;

    return {
        petsWithRequests,
        adoptionRequests,
        isLoading,
        totalRequestCount
    };
};

export default useMyPetsWithRequests;
