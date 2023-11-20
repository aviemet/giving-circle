class CirclesMember < ApplicationRecord
  belongs_to :circle
  belongs_to :member

  scope :includes_associated, -> { includes([:cirlce, :member]) }
end
