const mongoose = require("mongoose");
const Message = require("../../../server/models/Message");

describe("Message Model", () => {
    beforeAll(() => {
        mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("should create a Message schema with correct fields", () => {
        const doc = new Message({
            conversationId: "conv123",
            sender: "user1",
            text: "Hello, this is a test message",
        });

        expect(doc.conversationId).toBe("conv123");
        expect(doc.sender).toBe("user1");
        expect(doc.text).toBe("Hello, this is a test message");
    });

    test("should allow fields to be omitted", () => {
        const doc = new Message({});
        expect(doc.conversationId).toBeUndefined();
        expect(doc.sender).toBeUndefined();
        expect(doc.text).toBeUndefined();
    });

    test("should create a Message with a timestamp", () => {
        const doc = new Message({
            conversationId: "conv123",
            sender: "user1",
            text: "Test message",
        });

        expect(doc.createdAt).toBeDefined();
        expect(doc.updatedAt).toBeDefined();
    });
});
