const mongoose = require('mongoose');
const PostComment = require('../../../server/models/PostComment');

describe('Post Comment Model', () => {
    beforeAll(() => {
        mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should create a Post Comment schema without fields', () => {
        const doc = new PostComment({});
        
        // Check that the document is defined
        expect(doc).toBeDefined();
        // Ensure the document is empty as there are no fields defined
        expect(doc.toObject()).toEqual({});
    });
});
