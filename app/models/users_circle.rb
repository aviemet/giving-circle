class UsersCircle < ApplicationRecord
  resourcify

  belongs_to :user
  belongs_to :circle

  scope :includes_associated, -> { includes([:user, :circle]) }
end
