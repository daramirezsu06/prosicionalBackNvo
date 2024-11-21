export const subHub = [
    {
        "id": 1,
        "name": "Banking",
        "description": "Banking services and facilities",
        "tags": ["Convenient banking", "Easy payments", "Atm access"],
        "overview": "To sign any contract in the Netherlands, diplomats must open a national bank account. ABN AMRO NV, located near the Embassy in The Hague, is popular.",
        detail: {
            banks: {
                commercialBanks: ["ABN AMRO", "ING", "Rabobank"],
                mobileBanks: ["bunq", "Revolut", "Wise"]
            },
            officeHours: "Mon-Fri 9:00 a.m. to 5:00 p.m.; Thu until 8:00 p.m.; Sat 10:00 a.m. to 2:00 p.m."
        },
        "isActive": true,
        "countryId": 121,
        "hubId": 4  // Links to "Finance" hub
    },
    {
        "id": 2,
        "name": "Foreign Currency usage",
        "description": "Exchange facilities, forex services",
        "tags": ["Exchange facilities", "Forex services"],
        detail: {
            services: [
                { name: "Currency exchange", description: "Available in major banks and currency exchange centers." },
                { name: "Forex services", description: "Guidelines for securing favorable rates." }
            ]
        },
        "isActive": true,
        "countryId": 121,
        "hubId": 4  // Links to "Finance" hub
    },
    {
        "id": 3,
        "name": "Cost of Living",
        "description": "Housing affordability, Different wages, Variable food price",
        "tags": ["Housing affordability", "Different wages", "Variable food price"],
        detail: {
            housing: "Housing costs differ based on location and type.",
            wages: "Varies depending on job type and region.",
            foodPrices: "Fluctuates with market conditions and location."
        },
        "isActive": true,
        "countryId": 121,
        "hubId": 4  // Links to "Finance" hub
    },
    {
        "id": 4,
        "name": "Investment",
        "description": "Stocks,Bonds, Real Estate",
        "tags": ["Stocks", "Bonds", "Real Estate"],
        detail: {
            stocks: "Various stock markets and brokerage services accessible.",
            bonds: "Government and corporate bonds for stable investment.",
            realEstate: "Property investment opportunities with local guidelines."
        },
        "isActive": true,
        "countryId": 121,
        "hubId": 4  // Links to "Finance" hub
    },
    {
        "id": 5,
        "name": "Auxiliary cost",
        "description": "Quality landline service, Municipal tax exemption",
        "tags": ["Quality landline service", "Municipal tax exemption"],
        detail: {
            landlineService: "Options for reliable and high-quality landline services.",
            taxExemption: "Information on municipal tax exemptions for diplomats."
        },
        "isActive": true,
        "countryId": 121,
        "hubId": 4  // Links to "Finance" hub
    }
];