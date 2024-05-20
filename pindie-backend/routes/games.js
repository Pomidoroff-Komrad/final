const gamesRouter = require("express").Router();
const { checkAuth } = require("../middlewares/auth.js");
//добавить checkEmptyFields!
const {findAllGames, createGame, findGameById, updateGame, deleteGame, checkIsVoteRequest} = require("../middlewares/games");
const {sendAllGames, sendCreatedGame, sendUpdatedGame, sendDeleteGame} = require("../controllers/games");

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.post("/games", checkAuth, findAllGames, createGame, sendCreatedGame);
gamesRouter.put("/games/:id", checkAuth, findGameById, checkIsVoteRequest, updateGame, sendUpdatedGame);
gamesRouter.delete('/games/:id', checkAuth, deleteGame, sendDeleteGame);

module.exports = gamesRouter;