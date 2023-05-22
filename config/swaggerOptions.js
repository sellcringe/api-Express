const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Api",
            version: "1.0.0",
            description:
                "Документация к моему api, где реализована авторизация, CRUD цикл постов учитывая Body.query {size: ,page: ,}",

        },
        servers: [
            {
                url: 'http://localhost:7000'
            }
        ],
    },
    apis: ["./routes/*.js"],
};

module.exports = options