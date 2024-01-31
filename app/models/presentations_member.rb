# == Schema Information
#
# Table name: presentations_members
#
#  id              :bigint           not null, primary key
#  presentation_id :bigint           not null
#  member_id       :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class PresentationsMember < ApplicationRecord
  belongs_to :presentation
  belongs_to :member

  scope :includes_associated, -> { includes([:presentation, :member]) }
end
