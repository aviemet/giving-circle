# == Schema Information
#
# Table name: people
#
#  id          :uuid             not null, primary key
#  active      :boolean          default(TRUE), not null
#  first_name  :string
#  last_name   :string
#  middle_name :string
#  slug        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_people_on_slug  (slug) UNIQUE
#
class PersonSerializer < ApplicationSerializer
  object_as :person

  identifier :slug

  attributes(
    :first_name,
    :last_name,
    :middle_name,
    :active,
    name: { type: :string },
  )
end
