# == Schema Information
#
# Table name: presentations
#
#  id                       :uuid             not null, primary key
#  active                   :boolean          default(FALSE), not null
#  name                     :string
#  settings                 :jsonb
#  slug                     :string           not null
#  template                 :boolean          default(FALSE), not null
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
#  fk_rails_...  (presentation_template_id => presentations.id)
#  fk_rails_...  (theme_id => themes.id)
#
class Presentation < ApplicationRecord
  include Ownable
  include PgSearch::Model

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  pg_search_scope(
    :search,
    against: [:name, :template],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  validates :name, presence: true
  validate :owner_matches_theme_owner

  belongs_to :theme, optional: false

  has_many :presentations_orgs, dependent: :destroy
  has_many :orgs, through: :presentations_orgs

  has_many :presentations_memberships, dependent: :destroy
  has_many :memberships, through: :presentations_memberships
  has_many :members, through: :memberships, source: :people

  has_many :people, through: :memberships

  has_many :presentations_distributions, dependent: :destroy
  has_many :distributions, through: :presentations_distributions, dependent: :nullify

  has_many :presentations_elements, dependent: :destroy
  has_many :elements, through: :presentations_elements, dependent: :nullify

  has_many :presentations_slides, dependent: :destroy
  has_many :slides, through: :presentations_slides, dependent: :nullify

  has_many :presentations_votes, dependent: :destroy
  has_many :votes, through: :presentations_votes, dependent: :nullify

  scope :includes_associated, -> { includes([:theme, :memberships, :orgs, :slides, :votes, :distributions]) }

  private

  def owner_matches_theme_owner
    return unless circle && theme&.circle

    unless circle.id == theme.circle.id
      errors.add(:owner_matches_theme_owner, "record owner and theme owner must match")
    end
  end
end
