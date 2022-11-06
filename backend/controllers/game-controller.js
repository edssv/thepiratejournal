// import gameModel from '../models/game-model';

// class GameController {
//     async getAll(req, res) {
//         try {
//             const games = await gameModel.find().populate('user').exec();
//             res.json(games);
//         } catch (err) {
//             console.log(err);
//             res.status(500).json({
//                 message: 'Не удалось получить список игр',
//             });
//         }
//     }
// }

// module.exports = new GameController();
