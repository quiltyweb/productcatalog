import { schema, validator, rules } from '@ioc:Adonis/Core/Validator'

class CategoryValidator {
  public schema = validator.compile(schema.create({
    name: schema.string({}, [
      rules.maxLength(80),
      rules.required(),
      // TODO: The `unique` rule can't be found by the linter, and I can't find
      // it in the source code. The package is in transition to a new version,
      // so check back later.
    ])
  }))

  public messages = {}
}

export default new CategoryValidator()
