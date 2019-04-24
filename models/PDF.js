const mongoose = require('mongoose');

const PDFSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    story: {
        type: jsPDF,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const PDF = mongoose.model('PDF', PDFSchema);

module.exports = PDF;