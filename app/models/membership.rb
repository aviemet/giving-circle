class Member < ApplicationRecord
  include Ownable
  include PgSearch::Model

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  pg_search_scope(
    :search,
    against: [:number, :funds, :active, :name],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  after_initialize :set_default_funds, if: :new_record?

  monetize :funds_cents

  validates :number, presence: true

  has_many :presentations_members, dependent: :destroy
  has_many :presentations, through: :presentations_members

  scope :includes_associated, -> { includes([]) }

  private

  def set_default_funds
    self.funds_cents ||= 0
  end
end
