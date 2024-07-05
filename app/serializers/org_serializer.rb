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
#  circle_id   :uuid             not null
#
# Indexes
#
#  index_orgs_on_circle_id  (circle_id)
#  index_orgs_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
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
