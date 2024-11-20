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
  include Ownable

  resourcify

  after_initialize :set_default_funds, if: :new_record?

  monetize :funds_cents

  validates :number, presence: true

  has_many :presentations_members, dependent: :destroy
  has_many :presentations, through: :presentations_members

  scope :includes_associated, -> { includes([:presentations_members, :presentations]) }

  private

  def set_default_funds
    self.funds_cents ||= 0
  end
end
