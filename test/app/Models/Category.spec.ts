import Category from '../../../app/Models/Category'

describe('Category', () => {
  const category = new Category()

  describe('#name', () => {
    const categoryName = 'Productios Bknes'

    it('has a name', () => {
      category.name = categoryName

      expect(category.name).toEqual(categoryName)
    })
  })
})