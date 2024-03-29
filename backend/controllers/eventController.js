const Event = require('../models/Event');
const eventController = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User.js')

// get all
eventController.get('/getAll', async(req,res) => {
    try {
        const events = await Event.find({}).populate('currentOwner', '-password')

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
    let events = []
    try {
        if(type) {
         events = await Event.find(type).populate('owner', '-password')
            return res.status(200).json(events)
        } else {
            events = await Event.find({})
        }

        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get counts of types 
eventController.get('/find/types', async(req, res) => {
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

//fetch my events
eventController.get('/find/my-events', verifyToken, async(req, res) => {
    try {
        const events = await Event.find({ currentOwner: req.user.id })

        return res.status(200).json(events)
    } catch (error) {
        console.log(error)
    }
})







//fetch bookmarked events
eventController.get('/find/bookmarked-events', verifyToken, async (req, res) => {
    try {
        const events = await Event.find({ bookmarkedUsers: { $in: [req.user.id] } })

        return res.status(200).json(events)
    } catch (error) {
        console.error(error)
    }
})


// get individual event
eventController.get('/find/:id', async(req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('currentOwner', '-password')

        if(!event) {
            throw new Error("No such Event with this id")
        } else {
            return res.status(200).json(event)
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

// update event
eventController.put('/:id', verifyToken, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if(event.currentOwner.toString() !== req.user.id){
         throw new Error("You are not allowed to modify Events besides your own")
 }    
    const updateEvent = await Event.findByIdAndUpdate(
        req.params.id,
        { $set: req.body},
        { new: true }
    )

    return res.status(200).json(updateEvent)
} catch (error) {
    return res.status(500).json(error)
}

})

// bookmark/unbookmark events
eventController.put('/bookmark/:id', verifyToken, async (req, res) => {
    try {
        let event = await Event.findById(req.params.id)
        if (event.currentOwner.toString() === req.user.id) {
            throw new Error("You are not allowed to bookmark your project")
        }


        if (event.bookmarkedUsers.includes(req.user.id)) {
            event.bookmarkedUsers = event.bookmarkedUsers.filter(id => id !== req.user.id)
            await event.save()
        } else {
            event.bookmarkedUsers.push(req.user.id)

            await event.save()
        }

        return res.status(200).json(event)
    } catch(error) {
        return res.status(500).json(error)
    }
})

//delete event
eventController.delete('/:id', verifyToken, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if(event.currentOwner.toString() !== req.user.id) {
            throw new Error("You are not allow to delete Events besides your own")
        }

        await event.delete()

        return res.status(200).json({ msg: "Successfully Deleted Event" })
    } catch (error) {
        return res.status(500).json(error)
    }
})



module.exports = eventController;