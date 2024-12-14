const mongoose = require("mongoose");
const FlagsProfile = require("../../../server/models/FlagsProfile");

describe("Flags Profile Model", () => {
    beforeAll(() => {
        mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("should create a Flags Profile schema without fields", () => {
        const doc = new FlagsProfile({});

        expect(doc).toBeDefined();
        expect(doc.toObject()).toEqual({});
    });
});
