module.exports = function (app) {
    const express = require("express");
    const inflection = require("inflection");
    const router = express.Router({
        mergeParams: true
    })
    
    router.post('/', async(req, res)=>{
        const model = await Category.create(req.body)
        res.send(model)
    })
    router.get('/', async (req, res) => {
        
        const items = await req.Model.find().populate('parent').limit(10)
        res.send(items)
    })

    router.get('/:id', async (req, res) => {
        const items = await Category.findById(req.params.id)
        res.send(items)
    })
    router.put('/:id', async (req, res) => {
        const items = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(items)
    })
    router.delete('/:id', async (req, res) => {
        const items = await Category.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    app.use('/admin/api/rest/:resource', async(req, res, next)=>{

        const ModelName = inflection.classify(req.params.resource)
            req.Model = require(`../../models/${ModelName}`)
        next()
    }, router) 

    //use 里面定义的参数 在router里面吗使用 所以加mergeParams

}

https://safetrip.zhengzhou.gov.cn:20021/disncov/community/getCommunityById?id=4280


