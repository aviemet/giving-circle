# == Schema Information
#
# Table name: presentations_orgs
#
#  id              :bigint           not null, primary key
#  presentation_id :bigint           not null
#  org_id          :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class PresentationsOrg < ApplicationRecord
  belongs_to :presentation
  belongs_to :org

  scope :includes_associated, -> { includes([:presentation, :org]) }
end
