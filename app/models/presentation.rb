# == Schema Information
#
# Table name: presentations
#
#  id              :uuid             not null, primary key
#  active          :boolean          default(FALSE), not null
#  name            :string           not null
#  settings        :jsonb
#  slug            :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  active_slide_id :uuid
#  template_id     :uuid
#  theme_id        :uuid             not null
#
# Indexes
#
#  index_presentations_on_active_slide_id  (active_slide_id)
#  index_presentations_on_slug             (slug) UNIQUE
#  index_presentations_on_template_id      (template_id)
#  index_presentations_on_theme_id         (theme_id)
#
# Foreign Keys
#
#  fk_rails_...  (active_slide_id => slides.id)
#  fk_rails_...  (template_id => templates.id)
#  fk_rails_...  (theme_id => themes.id)
#
class Presentation < ApplicationRecord
  include Ownable

  extend FriendlyId

  friendly_id :name, use: [:slugged, :history]

  include PgSearchable

  pg_search_config(
    against: [:name, :template],
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

  has_many :presentations_elements, dependent: :destroy
  has_many :elements, through: :presentations_elements, dependent: :nullify

  has_many :slide_parents, as: :parentable, dependent: :destroy
  has_many :slides, through: :slide_parents
  belongs_to :active_slide, class_name: "Slide", optional: true

  scope :templates, -> { where(template: true) }
  scope :includes_associated, -> { includes([:theme, :memberships, :orgs, :slides]) }

  def activate
    self.update(active: true)
  end

  private

  def owner_matches_theme_owner
    return unless circle && theme&.circle

    unless circle.id == theme.circle.id
      errors.add(:owner_matches_theme_owner, "record owner and theme owner must match")
    end
  end
end
