# == Schema Information
#
# Table name: orgs
#
#  id          :uuid             not null, primary key
#  description :string
#  name        :string
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_orgs_on_slug  (slug) UNIQUE
#
class OrgSerializer < ApplicationSerializer
  object_as :org

  identifier :slug

  attributes(
    :name,
    :description,
    :circle_id,
  )
end
