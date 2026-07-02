class Categories::OptionsSerializer < ApplicationSerializer
  object_as :category

  attributes(
    :id,
    :slug,
    :name,
  )

  type :string
  def category_with_type
    category.category_with_type
  end
end
