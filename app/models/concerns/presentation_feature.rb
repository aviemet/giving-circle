module PresentationFeature
  extend ActiveSupport::Concern

  included do
    has_many :presentations_elements, dependent: :destroy, inverse_of: :element
    has_many :presentations, through: :presentations_elements

    scope :templates, -> { where(template: true) }
  end
end
