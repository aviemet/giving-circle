class User < ApplicationRecord
  resourcify
  rolify

  # :omniauthable, :timeoutable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable,  :confirmable, :lockable, :trackable

  scope :includes_associated, -> { includes([:circles]) }

  has_many :users_circles
  has_many :circles, through: :users_circles
end
