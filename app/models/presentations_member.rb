class PresentationsMember < ApplicationRecord
  belongs_to :presentation
  belongs_to :member

  scope :includes_associated, -> { includes([:presentation, :member]) }
end
