const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileDownloadSchema = new Schema({
    url: {
        type: String
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('FileDownload', fileDownloadSchema);