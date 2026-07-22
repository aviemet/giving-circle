# == Schema Information
#
# Table name: presentations
#
#  id               :uuid             not null, primary key
#  active           :boolean          default(FALSE), not null
#  name             :string           not null
#  settings         :jsonb
#  slug             :string
#  template_version :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  active_slide_id  :uuid
#  template_id      :uuid
#  theme_id         :uuid             not null
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
  extend FriendlyId

  friendly_id :name, use: [:slugged, :history]

  include PgSearchable

  pg_search_config(
    against: [:name, :template],
  )

  resourcify

  validates :name, presence: true

  belongs_to :theme, optional: false
  delegate :circle, to: :theme, allow_nil: true

  has_many :presentations_orgs, dependent: :destroy
  has_many :orgs, -> {
    select("orgs.*, presentations_orgs.ask_cents as ask_cents, presentations_orgs.ask_currency as ask_currency")
      .extending {
        def count(args = :all)
          except(:select).calculate(:count, args)
        end
      }
  }, through: :presentations_orgs

  has_many :presentations_memberships, dependent: :destroy
  has_many :memberships, through: :presentations_memberships
  has_many :members, through: :memberships, source: :people

  has_many :people, through: :memberships

  has_many :presentations_elements, dependent: :destroy
  has_many :elements, through: :presentations_elements, dependent: :nullify

  has_many :interactions, class_name: "Presentation::Interaction", dependent: :destroy

  has_many :slide_parents, as: :parentable, dependent: :delete_all
  has_many :slides, through: :slide_parents, dependent: :nullify
  belongs_to :active_slide, class_name: "Slide", optional: true

  belongs_to :template, optional: true

  after_create :sync_orgs_from_theme

  scope :includes_associated, -> { includes([:theme, :memberships, :presentations_orgs, :slides, :template]) }

  def activate
    self.update(active: true)
  end

  def copy_template_slides
    return unless template

    template.transaction do
      template.slides.each do |slide|
        new_slide = slide.dup

        self.slides << new_slide

        new_slide.source_slide = slide
        new_slide.slug = nil
        new_slide.save!
      end

      update(template_version: template.version)
    end
  end

  def sync_template_slides
    return unless template

    slides.destroy_all

    copy_template_slides
  end

  private

  def sync_orgs_from_theme
    return unless theme.present? && orgs.empty?

    orgs << theme.orgs
  end
end
