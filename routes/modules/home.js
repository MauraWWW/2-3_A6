const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 首頁
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 搜尋餐廳
router.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect('/')
  }
  const keywords = req.query.keywords
  const normalizedKeyword = req.query.keywords.trim().replace(/ /g, '').toLowerCase()
  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(restaurant => {
        return restaurant.name.trim().replace(/ /g, '').toLowerCase().includes(normalizedKeyword) || restaurant.category.includes(normalizedKeyword)
      })
      res.render('index', { restaurants: filteredRestaurants, keywords })
    })
    .catch(error => console.log(error))
})

module.exports = router