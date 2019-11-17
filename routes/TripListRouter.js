const { Router } = require("express");
const { User, Location, TripList, sequelize } = require("../models");
const { hashPassword, genToken, checkPassword } = require("../services/auth");

const tripListRouter = Router({ mergeParams: true });

// Route for all trip list user owns
tripListRouter.get('/', async (req, res) => {
  const tripList = await TripList.findAll();
  res.json({tripList})
})

// get triplist 
tripListRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const triplists = await TripList.findAll({
    where: {
      user_id: id
    }
  });
  res.json({ triplists })
})

// create new trip list 
tripListRouter.post('/', async (req, res) => {
  const data = req.body
  const userId = req.params.userId
  const user = await User.findByPk(userId)
  const triplist = await TripList.create(data)
  triplist.setUser(user)
  res.json({ triplist })
})

tripListRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const data = req.body
  const triplist = await TripList.findByPk(id)
  await triplist.update(data) 

  res.json({ triplist})
})

tripListRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const triplist = await TripList.findByPk(id)
  try {
    const post = await tripList.destroy()
    res.json(triplist)
  } catch (e) {
    next(e)
  }
})


module.exports = tripListRouter;
