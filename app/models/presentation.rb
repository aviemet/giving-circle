# == Schema Information
#
# Table name: presentations
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  theme_id   :bigint           not null
#
# Indexes
#
#  index_presentations_on_theme_id  (theme_id)
#
# Foreign Keys
#
#  fk_rails_...  (theme_id => themes.id)
#
class Presentation < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:theme, :name],
    associated_against: {
      theme: [],
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  validates :name, presence: true

  belongs_to :theme

  has_many :presentations_members, dependent: :destroy
  has_many :members, through: :presentations_members

  has_many :presentations_orgs, dependent: :destroy
  has_many :orgs, through: :presentations_orgs

  scope :includes_associated, -> { includes([:theme, :members, :orgs]) }
end
