const AWS = require('aws-sdk');

exports.uploadToS3 = (data, filename) => {
    // const BUCKET_NAME = 'expensetrackingapp0809';
    // const IAM_USER_KEY = 'AKIA6FVZN4FKVZNCUF4N';
    // const IAM_USER_SECRET = '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';
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

    let s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET
        // Bucket: BUCKET_NAME
    })

    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
        // Access control level
        // public - read -> automatically readable for puclic use
    }

    return new Promise((resolve, reject) => {
        s3Bucket.upload(params, (err, s3response) => {
            if(err){
                console.log('Something went wrong', err);
                reject(err);
            } else{
                console.log('success', s3response);
                resolve(s3response.Location);
            }
        })
    })
}