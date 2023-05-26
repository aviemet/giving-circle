class CirclesTheme < ApplicationRecord
  resourcify

  belongs_to :circle
  belongs_to :theme

  scope :includes_associated, -> { includes([:circle, :theme]) }
end
