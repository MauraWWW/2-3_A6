const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增餐廳
router.get('/new', (req, res) => {
  return res.render('new')
})

// 瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})


// 修改編輯餐廳畫面
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 提交修改編輯之餐廳資訊
router.patch('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 提交新增之餐廳資訊
router.post('/', (req, res) => {
  const newRestaurant = req.body
  Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 刪除餐廳
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router