import { schema, validator, rules } from '@ioc:Adonis/Core/Validator'

class ProductValidator {
  public schema = validator.compile(schema.create({
    categoryId: schema.number([rules.required()]),
    name: schema.string({}, [
      rules.maxLength(80),
      rules.required(),
      // TODO: The `unique` rule can't be found by the linter, and I can't find
      // it in the source code. The package is in transition to a new version,
      // so check back later.
    ]),
    description: schema.string(),
    imagePath: schema.string(),
    // TODO: There doesn't seem to be min/max value validators for numbers yet.
    purchasePrice: schema.number([rules.required()]),
    salePrice: schema.number([rules.required()]),
    supplierName: schema.string(),
    attachmentPath: schema.string(),
  }))

  public messages = {}
}

export default new ProductValidator()
