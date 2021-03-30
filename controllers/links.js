const Category = require('../models/category');
const Link = require('../models/link');

exports.createCategory = async (req, res, next) => {
    const request = req.body

      if (Object.keys(request).length > 0) { // check if the request with cookie exist
        const userData = JSON.parse(req.body.cookies.loged)
        const category = request.note.categoryName

        await Category.create({
            userId: userData.id,
            category: category,
        })
        const categories = await Category.findAll({ where: { userId: userData.id } });

        res.json({ categories: categories })
    }
}

exports.deleteCategory = async (req, res, next) => {
    const categoryId = req.body.categoryId
    const userData = JSON.parse(req.body.cookies.loged)

    await Category.destroy({ where: { id: categoryId }});
    await Link.destroy({ where: { categoryId: categoryId }});

    const categories = await Category.findAll({ where: { userId: userData.id } });

    res.json({ categories: categories })
    

}

exports.getCategories = async (req, res, next) => {
    const request = req.body

      if (Object.keys(request).length > 0) { // check if the request with cookie exist
        const userData = JSON.parse(req.body.loged)
        const categories = await Category.findAll({ where: { userId: userData.id } });
        res.json({ categories: categories })
    }
}

exports.createLink = async (req, res, next) => {
    const categoryId = req.body.categoryId
    const linkName = req.body.linkName 
    const url = req.body.url
    const color = req.body.color


    await Link.create({
        categoryId,
        linkName,
        url,
        color,
    })
    const links = await Link.findAll({ where: { categoryId: categoryId } });

    res.json({ links: links })
}

exports.deleteLink = async (req, res, next) => {
    const linkId = req.body.id
    const categoryId = req.body.categoryId

    await Link.destroy({ where: { id: linkId }});

    const links = await Link.findAll({ where: { categoryId: categoryId } });

    res.json({ links: links })
}

exports.getLinks = async (req, res, next) => {
    const categoryId = req.body.categoryId

    const links = await Link.findAll({ where: { categoryId: categoryId } });

    res.json({ links: links })
}