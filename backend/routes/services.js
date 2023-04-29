const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { services } = require('../models/models')

// GET services for org
router.get('/', (req, res, next) => {
    services
        .find({ orgs: org }, (error, data) => {
            if (error) {
                return next(error)
            } else {
                return res.json(data)
            }
        })
        .sort({ updatedAt: -1 })
        .limit(10)
})

// POST new service
router.post('/', (req, res, next) => {
    const newService = req.body
    newService.orgs = [org]
    services.create(newService, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// PUT update Service
router.put('/update/:id', (req, res, next) => {
    services.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// hard DELETE service by ID
router.delete('/:id', (req, res, next) => {
    services.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else if (!data) {
            res.status(400).send('Service not found')
        } else {
            res.send('Service deleted')
        }
    })
})

module.exports = router
