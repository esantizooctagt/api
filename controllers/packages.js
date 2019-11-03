const Package = require('../models/package');

exports.packages_get_all = (req, res, next) => {
    Package.find()
        .exec()
        .then(packages => {
            const response = 
                packages.map(package => {
                    return {
                        PackageId: package._id,
                        Description: package.Description,
                        Price: package.Price,
                        Currency: package.Currency,
                        Status: package.Status,
                        Applications: package.Applications,
                        URL: 'http://localhost:3000/taxes/' + package._id
                    }
                })

            res.status(200).send( response );
        })
        .catch(error => {
            console.log('Error: ' + error);
            res.status(500).json({ Error: error })
        });
}