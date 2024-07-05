# == Schema Information
#
# Table name: people
#
#  id          :uuid             not null, primary key
#  active      :boolean          default(TRUE), not null
#  first_name  :string
#  last_name   :string
#  middle_name :string
#  number      :string
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_people_on_slug  (slug) UNIQUE
#
class MemberSerializer < ApplicationSerializer
  object_as :member

  identifier :slug

  attributes(
    :first_name,
    :last_name,
    :middle_name,
    :number,
    :active,
    name: { type: :string },
  )
end
