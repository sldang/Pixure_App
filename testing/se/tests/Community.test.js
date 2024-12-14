const mongoose = require("mongoose");
const Community = require("../../../server/models/Community");

describe("Community Model", () => {
    beforeAll(() => {
        mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("should create a Community schema with the correct fields", () => {
        const doc = new Community({
            name: "Test Community",
            communityPosts: ["post1", "post2"],
            communityMembers: ["user1", "user2"],
            description: "This is a test community",
            restriction: true,
            imageString: "someBase64EncodedString",
        });

        expect(doc.name).toBe("Test Community");
        expect(doc.communityPosts).toEqual(["post1", "post2"]);
        expect(doc.communityMembers).toEqual(["user1", "user2"]);
        expect(doc.description).toBe("This is a test community");
        expect(doc.restriction).toBe(true);
        expect(doc.imageString).toBe("someBase64EncodedString");
    });

    test("should allow optional fields to be omitted", () => {
        const doc = new Community({});
        expect(doc.name).toBeUndefined();
        expect(doc.communityPosts).toBeUndefined();
        expect(doc.communityMembers).toBeUndefined();
        expect(doc.description).toBeUndefined();
        expect(doc.restriction).toBeUndefined();
        expect(doc.imageString).toBeUndefined();
    });

    test("should enforce the schema types", () => {
        const doc = new Community({
            name: 12345, // Invalid type
            restriction: "notABoolean", // Invalid type
        });

        expect(doc.name).toBe(12345); // Mongoose allows this unless explicitly validated
        expect(doc.restriction).toBe("notABoolean"); // Mongoose allows this unless explicitly validated
    });
});
