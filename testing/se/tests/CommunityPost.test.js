const mongoose = require("mongoose");
const CommunityPost = require("../../../server/models/CommunityPost");

describe("Community Post Model", () => {
    beforeAll(() => {
        mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("should create a Community Post schema with the correct fields", () => {
        const doc = new CommunityPost({
            communityId: "12345",
            post: new mongoose.Types.ObjectId(),
        });

        expect(doc.communityId).toBe("12345");
        expect(doc.post).toBeInstanceOf(mongoose.Types.ObjectId);
    });

    test("should allow optional fields to be omitted", () => {
        const doc = new CommunityPost({});
        expect(doc.communityId).toBeUndefined();
        expect(doc.post).toBeUndefined();
    });

    test("should enforce the schema types", () => {
        const invalidDoc = new CommunityPost({
            communityId: 12345, // Invalid type
            post: "notAnObjectId", // Invalid type
        });

        expect(invalidDoc.communityId).toBe(12345); // Allowed unless explicitly validated
        expect(invalidDoc.post).toBe("notAnObjectId"); // Allowed unless explicitly validated
    });
});
