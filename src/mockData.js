export const mockChatHistory = [
    {
        id: "msg-1",
        sender: "agent",
        timestamp: "12:00",
        sessionId: "76b3d10e-9e42-4f95-94f7-a2bde7cbd539",
        stage: "GREETING",
        message: "Привет! Я твой интеллектуальный гид от Островка. Куда планируете отправиться и какой у вас бюджет?",
        cards: [],
        suggestedActions: ["В Сочи на выходные", "Подобрать отель в Москве"]
    },
    {
        id: "msg-2",
        sender: "user",
        timestamp: "12:01",
        message: "Хочу в Сочи, бюджет около 50 тысяч рублей на всё проживание.",
        cards: [],
        suggestedActions: []
    },
    {
        id: "msg-3",
        sender: "agent",
        timestamp: "12:01",
        sessionId: "76b3d10e-9e42-4f95-94f7-a2bde7cbd539",
        stage: "SELECTION",
        message: "Нашёл отличные варианты в Сочи, которые укладываются в ваш бюджет. Посмотрите:",
        cards: [
            {
                hotel: {
                    id: 1,
                    name: "Прибрежный Отель & СПА",
                    destination: "Сочи",
                    stars: 4,
                    pricePerNight: 6500,
                    rating: 8.7,
                    distanceToBeachM: 150,
                    distanceToCenterM: 3000,
                    freeCancellation: true,
                    mealPlan: "BREAKFAST",
                    familyFriendly: false,
                    petsAllowed: false,
                    checkin24h: false,
                    amenities: ["бассейн", "wifi", "завтрак"]
                },
                score: 0.95,
                totalPrice: 45500,
                reasons: ["Рейтинг 8.7", "Пляж в 150 м", "Бесплатная отмена"],
                tradeoffs: ["Дороже среднего по подборке на 26%"]
            },
            {
                hotel: {
                    id: 2,
                    name: "Уют Море Хостел/Апартаменты",
                    destination: "Сочи",
                    stars: 3,
                    pricePerNight: 4200,
                    rating: 7.9,
                    distanceToBeachM: 600,
                    distanceToCenterM: 1200,
                    freeCancellation: false,
                    mealPlan: "NONE",
                    familyFriendly: true,
                    petsAllowed: true,
                    checkin24h: true,
                    amenities: ["wifi", "кухня", "парковка"]
                },
                score: 0.82,
                totalPrice: 29400,
                reasons: ["Близко к центру (1.2 км)", "Бюджетный вариант", "Можно с питомцами"],
                tradeoffs: ["Нет завтрака", "Пляж в 600 м (пешком 10 минут)"]
            }
        ],
        suggestedActions: ["Сравнить варианты", "Изменить бюджет", "Показать еще"]
    }
];
