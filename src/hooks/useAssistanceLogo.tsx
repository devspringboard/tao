export const useAssistanceLogo = (id: number) => {
    const assistanceLogo = [
        {
            id: 1,
            logo: "/assets/images/Education.svg",
        },
        {
            id: 2,
            logo: "/assets/images/Man-Doctor.svg",
        },
        {
            id: 3,
            logo: "/assets/images/Barter-Trading.svg",
        },
        {
            id: 4,
            logo: "/assets/images/Burial-Service.svg",
        },
    ];

    return assistanceLogo.find((item) => item.id === id);
};
