const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true,
        default: "empty"
    }
});

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;