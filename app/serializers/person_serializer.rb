# == Schema Information
#
# Table name: people
#
#  id          :bigint           not null, primary key
#  active      :boolean          default(TRUE), not null
#  first_name  :string
#  last_name   :string
#  middle_name :string
#  number      :string
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class PersonSerializer < ApplicationSerializer
  object_as :person

  identifier :slug

  attributes(
    :first_name,
    :last_name,
    :middle_name,
    :active,
  )

  type :string
  def name
    "#{person.first_name} #{person.last_name}".strip
  end
end
