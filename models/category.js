const { sequelize } = require('.')

module.exports = (sequelize, DataType)=>{

    const Category = sequelize.define('Category', {

        title:{
            type: DataType.STRING,
            allowNull: false
        },
        slug:{
            type: DataType.STRING,
            allowNull: false
        }

    })
    //Relacionamento de 1-p-N
    Category.associate = (models)=>{
        Category.hasMany(models.Article)
    }

    return Category;

}