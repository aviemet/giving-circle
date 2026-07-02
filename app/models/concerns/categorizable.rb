module Categorizable
  extend ActiveSupport::Concern

  included do
    before_validation :assign_default_category, on: :create

    belongs_to :category

    scope :for_category, ->(category) { where(category: category) }
  end

  private

  def assign_default_category
    return if category.present?

    self.category = Category.for_type(self.class.name).find_by(name: "Other")
  end
end
