const { sequelize } = require('.')

module.exports = (sequelize, DataType)=>{

    const Article = sequelize.define('Article', {

        title:{
            type: DataType.STRING,
            allowNull: false
        },
        slug:{
            type: DataType.STRING,
            allowNull: false
        },
        body:{
            type: DataType.TEXT,
            allowNull: false
        }
    })
    //Relacionamento de 1-p-1
    Article.associate = (models)=>{
        Article.belongsTo(models.Category)
    }
    

    return Article;

}