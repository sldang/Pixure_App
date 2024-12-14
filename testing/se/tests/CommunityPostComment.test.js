const mongoose = require("mongoose");
const CommunityPostComment = require("../../../server/models/CommunityPostComment");

describe("Community Post Comment Model", () => {
    beforeAll(() => {
        mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("should create a Community Post Comment schema without fields", () => {
        const doc = new CommunityPostComment({});

        expect(doc).toBeDefined();
        expect(doc.toObject()).toEqual({});
    });
});
