const getAll = model => async (req, res, next) => {
    try {
        const data = await model.find()
        res.status(200).json({
            status: 'Success',
            length: data.length,
            data
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            message: error.message
        })
    }
}

module.exports = {
    getAll
}