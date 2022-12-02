const User = require('../models/user-model');

const checkFollow = async (req, res, next) => {
    const followerId = req.user.id;
    const idolUsername = req.params.username;

    try {
        const idol = await User.findOne({ username: idolUsername });
        const idolId = idol._id.toString();

        const user = await User.findOne({
            $and: [{ _id: followerId }, { follow: { $in: idolId } }],
        });

        if (user) return res.status(400).json({ message: 'Вы уже подписаны на этого автора.' });

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const checkUnFollow = async (req, res, next) => {
    const followerId = req.user.id;
    const idolUsername = req.params.username;

    try {
        const idol = await User.findOne({ username: idolUsername });
        const idolId = idol._id.toString();

        const user = await User.findOne({
            $and: [{ _id: followerId }, { follow: { $in: idolId } }],
        });

        if (!user) return res.status(400).json({ message: 'Вы уже отписались от этого автора.' });

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { checkFollow, checkUnFollow };
