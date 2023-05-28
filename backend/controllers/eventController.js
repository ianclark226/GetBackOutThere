const Event = require('../models/Event');
const eventController = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const { events } = require('../models/User');

// get all
eventController.get('/getAll', async(req,res) => {
    try {
        const events = await Event.find({})

        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

//get featured
eventController.get('/find/featured', async(req, res) => {
    try {
        const featuredEvents = await Event.find({ featured: true }).populate('currentOwner', '-password')

        return res.status(200).json(featuredEvents)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get all from a specific type
eventController.get('/find', async(req, res) => {
    const type = req.query
    try {
        if(type) {
            const events = await Event.find(type).populate('currentOwner', '-password')
            return res.status(200).json(events)
        } else {
            return res.status(500).json({ msg: "Not a type"})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get counts of types 
eventController.get('/find/types', async(req, res) => {
    const type = req.query
    try {
      const boozeType = await Event.countDocuments({type: 'booze'})
      const craftsType = await Event.countDocuments({type: 'crafts'})
      const datingType = await Event.countDocuments({type: 'dating'})
      const gamingType = await Event.countDocuments({type: 'gaming'})
      const sportsType = await Event.countDocuments({type: 'sports'})

      return res.status(200).json({
        booze: boozeType,
        crafts: craftsType,
        dating: datingType,
        gaming: gamingType,
        sports: sportsType
      })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get individual event
eventController.get('/find/:id', async(req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('currentOwner', '-passwrod')

        if(!event) {
            throw new Error("No such Event with this id")
        } else {
            return res.status(500).json(event)
        }
    } catch(error) {
        return res.status(500).json(error.message)
    }
})

// create a event
eventController.post('/', verifyToken, async(req, res) => {
    try {
        const newEvent = await Event.create({...req.body, currentOwner: req.user.id})

        return res.status(201).json(newEvent)
    } catch(error) {
        return res.status(500).json(error.message)
    }
})

//update event
eventController.put('/:id', verifyToken, async(req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if(event.currentOwner.toString() !== req.user.id.toString()) {
        throw new Error("You are not allowed to update other peoples events")

        } else {
            const updateEvent = await Event.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            )

            return res.status(200).json(updateEvent)
        }
    } catch(error) {
        return res.status(500).json(error.message)
    }
})
//delete event
eventController.post('/:id', verifyToken, async(req, res) => {
    try {
        const event = await Event.findById(req.params.id)

        if(event.currentOwner.toString() !== req.user.id.toString()) {
            throw new Error("You are not allowed to delete other users events")
        } else {
            await event.delete()

            return res.status(200).json({msg: 'Successfully Deleted'})
        }
    } catch(error){
        return res.status(500).json(error.message)
    }
})

module.exports = eventController;