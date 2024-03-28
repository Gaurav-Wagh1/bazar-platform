"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Supplier);
      this.belongsTo(models.Subcategory);
      this.hasMany(models.ProductSKU);
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      highlights: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
