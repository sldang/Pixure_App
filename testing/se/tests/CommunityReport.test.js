const mongoose = require("mongoose");
const CommunityReport = require("../../../server/models/CommunityReport");

describe("Community Report Model", () => {
    beforeAll(() => {
        mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("should create a Community Report schema without fields", () => {
        const doc = new CommunityReport({});

        expect(doc).toBeDefined();
        expect(doc.toObject()).toEqual({});
    });
});
