const getAll = model => async (req, res, next) => {
    try {
        const data = await model.find().select('-__v')

        res.status(200).json({
            status: 'Success',
            length: data.length,
            data
        })
    } catch (error) {
        res.status(400).json({
            status: 'Error',
            message: error.message
        })
    }
}

module.exports = {
    getAll
}