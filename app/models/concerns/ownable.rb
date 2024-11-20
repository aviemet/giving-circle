module Ownable
  extend ActiveSupport::Concern

  included do
    has_one :owner, as: :ownable, class_name: 'Ownership', dependent: :destroy
    has_one :circle, through: :owner

    accepts_nested_attributes_for :owner

    validates :circle, presence: true
  end
end