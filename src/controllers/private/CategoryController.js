const {  CategoryService } = require('../../services');
const { StatusCode } = require('../../utils');

class CategoryController{

    static async getCategories(req, res){
        const { HTTP_200_OK } = StatusCode;
        
        try{
            const data = await CategoryService.getCategories();

            return res.status(HTTP_200_OK).json(data);
        } catch(error){
            return res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });
        }
    }
}

module.exports = { CategoryController };