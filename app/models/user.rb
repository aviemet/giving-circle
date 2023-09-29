class User < ApplicationRecord
  resourcify
  rolify

  # :omniauthable, :timeoutable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable,  :confirmable, :lockable, :trackable

  belongs_to :active_circle, class_name: :Circle, optional: true

  scope :includes_associated, -> { includes([:circles]) }

  def circles
    Circle.with_roles(Circle.find_roles.pluck(:name), self)
  end
end
