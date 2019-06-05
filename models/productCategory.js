/* eslint-disable camelcase */

export default (sequelize, Sequelize) => {
  const productCategorySchema = {
  }

  const productCategory = sequelize.define('product_category', productCategorySchema, {
    freezeTableName: true,
    timestamps: false
  })

  productCategory.associate = db => {
    productCategory.belongsTo(db.product, {
      foreignKey: 'product_id',
      target: 'product_id'
    })

    productCategory.belongsTo(db.category, {
      foreignKey: 'category_id',
      target: 'category_id'
    })
  }

  productCategory.removeAttribute('id')

  return productCategory
}
