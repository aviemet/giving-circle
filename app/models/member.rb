# == Schema Information
#
# Table name: people
#
#  id             :uuid             not null, primary key
#  active         :boolean          default(TRUE), not null
#  first_name     :string
#  funds_cents    :integer
#  funds_currency :string           default("USD"), not null
#  last_name      :string
#  middle_name    :string
#  number         :string
#  slug           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_people_on_slug  (slug) UNIQUE
#
class Member < Person
  resourcify

  has_many :circles_members, dependent: :destroy
  has_many :circles, through: :circles_members

  has_many :themes_members, dependent: :destroy
  has_many :themes, through: :themes_members

  has_many :presentations_members, dependent: :destroy
  has_many :presentations, through: :presentations_members

  scope :includes_associated, -> { includes([:circles, :presentations]) }
end
