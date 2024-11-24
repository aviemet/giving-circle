module PresentationFeature
  extend ActiveSupport::Concern

  included do
    has_many :presentations_distributions, dependent: :destroy
    has_many :presentations, through: :presentations_distributions

    scope :templates, -> { where(template: true) }
  end
end
