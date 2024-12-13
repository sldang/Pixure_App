const mongoose = require("mongoose");
const LocalCommunityAccount = require("../../../server/models/LocalCommunityAccount");

describe("Local Community Account Model", () => {
    beforeAll(() => {
        mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("should create a Local Community Account schema without fields", () => {
        const doc = new LocalCommunityAccount({});

        expect(doc).toBeDefined();
        expect(doc.toObject()).toEqual({});
    });
});
