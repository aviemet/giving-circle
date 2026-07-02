class Categories::ShowSerializer < CategorySerializer
  attributes(
    :id,
    :slug,
    :created_at,
    :updated_at,
    qty: { type: :number },
  )

  type :string
  def plural
    category.categorizable_type.pluralize
  end
end
