const games = require("../models/game");

const findAllGames = async (req, res, next) =>{
    if(req.query["categories.name"]) { 
        req.gamesArray = await games.findGameByCategory(req.query["categories.name"]);
        next();
        return;
    }
    req.gamesArray = await games.find({}).populate("categories").populate({
        path: "users",
        select: '-password',
    });
    next()
};
const findGameById = async (req, res, next) =>{
    try{
        req.game = await games.findById(req.params.id).populate('categories').populate('users');
        next()
    } catch(err){
        res.status(404).json({ message: "Не удалось найти игру"})
    }
}
const createGame = async (req, res, next) =>{
    try{
        req.games = await games.create(req.body);
        next();
    } catch(err){
        res.setHeader("Content-Type", "application/json");
        res.status(400).json({ message: "Не удалось создать игру"})
    }
}
const updateGame = async (req, res, next) =>{
    try{
        req.game = await games.findByIdAndUpdate(req.params.id, req.body);
        next()
    } catch(err){
        res.status(400).json({message: 'Не удалось обновить игру'})
    }
}
const deleteGame = async (req, res, next) =>{
    try{
        req.game = await games.findByIdAndDelete(req.params.id);
        next();
    } catch(err){
        res.status(400).json({ message: 'Не удалось удалить игру' })
    }
}
const checkEmptyFields = async (req, res, next) => {
    if(req.isVoteRequest) {
        next();
        return;
      }
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.image ||
      !req.body.link ||
      !req.body.developer
    ) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Заполните все поля" }));
    } else {
      next();
    }
  };
  const checkIfCategoriesAvaliable = async (req, res, next) => {
    if(req.isVoteRequest) {
        next();
        return;
      }
    if (!req.body.categories || req.body.categories.length === 0) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Выберите хотя бы одну категорию" }));
    } else {
      next();
    }
  };
  const checkIsGameExists = async (req, res, next) => {
    const isInArray = req.gamesArray.find((game) => {
      return req.body.title === game.title;
    });
    if (isInArray) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Игра с таким названием уже существует" }));
    } else {
      next();
    }
  };
  const checkIfUsersAreSafe = async (req, res, next) => {
  if (!req.body.users) {
    next();
    return;
  }
  if (req.body.users.length - 1 === req.game.users.length) {
    next();
    return;
  } else {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя" }));
  }
  }; 
const checkIsVoteRequest = async (req, res, next) => {
  if (Object.keys(req.body).length === 1 && req.body.users) {
    req.isVoteRequest = true;
  }
  next();
};
module.exports = {findAllGames, findGameById, createGame, updateGame, deleteGame, checkEmptyFields, checkIfCategoriesAvaliable, checkIsVoteRequest, checkIsGameExists, checkIfUsersAreSafe};