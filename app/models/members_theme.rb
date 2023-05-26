class MembersTheme < ApplicationRecord
  resourcify

  belongs_to :member
  belongs_to :theme

  scope :includes_associated, -> { includes([:member, :theme]) }
end
