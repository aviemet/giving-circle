# == Schema Information
#
# Table name: presentations
#
#  id                       :uuid             not null, primary key
#  name                     :string
#  slug                     :string           not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  presentation_template_id :uuid
#  theme_id                 :uuid             not null
#
# Indexes
#
#  index_presentations_on_presentation_template_id  (presentation_template_id)
#  index_presentations_on_slug                      (slug) UNIQUE
#  index_presentations_on_theme_id                  (theme_id)
#
# Foreign Keys
#
#  fk_rails_...  (presentation_template_id => presentation_templates.id)
#  fk_rails_...  (theme_id => themes.id)
#
class Presentation < ApplicationRecord
  include PgSearch::Model

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

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

  has_many :presentation_slides, dependent: :nullify

  scope :includes_associated, -> { includes([:theme, :members, :orgs]) }
end
