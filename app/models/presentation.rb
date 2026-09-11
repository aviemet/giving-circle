# == Schema Information
#
# Table name: presentations
#
#  id               :uuid             not null, primary key
#  active           :boolean          default(FALSE), not null
#  element_controls :jsonb            not null
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
  validate :finalist_count_must_be_positive

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
  has_many :messages, class_name: "Presentation::Message", dependent: :destroy

  has_many :slide_parents, as: :parentable, dependent: :delete_all
  has_many :slides, through: :slide_parents, dependent: :nullify
  belongs_to :active_slide, class_name: "Slide", optional: true

  belongs_to :template, optional: true

  after_create :sync_orgs_from_theme

  scope :includes_associated, -> { includes([:theme, :memberships, :presentations_orgs, :slides, :template]) }

  def activate
    self.update(active: true)
  end

  def accepting_interaction
    interactions.accepting_responses.first
  end

  def membership_for_user(user)
    return if user.blank? || user.person_id.blank?

    memberships
      .left_outer_joins(:memberships_people)
      .where(
        "memberships.person_id = :person_id OR memberships_people.person_id = :person_id",
        person_id: user.person_id,
      )
      .distinct
      .first
  end

  def available_funds_for(membership)
    return if membership.blank?

    presentations_memberships.find_by(membership_id: membership.id)&.funds
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
        new_slide.copy_thumbnail_from(slide)
      end

      update(template_version: template.version)
    end
  end

  def copy_template_messages
    return unless template

    template.message_templates.each do |message_template|
      Presentation::Message.copy_from_template!(
        presentation: self,
        message_template: message_template,
      )
    end
  end

  def sync_template_slides
    return unless template

    slides.destroy_all

    copy_template_slides
  end

  def merge_element_control!(slide_id:, element_id:, element_type:, control:, value:)
    controls = element_controls.deep_dup
    controls[slide_id] ||= {}
    controls[slide_id][element_id] ||= {}
    controls[slide_id][element_id][element_type] ||= {}
    controls[slide_id][element_id][element_type][control] = value
    update!(element_controls: controls)
  end

  def settings
    Presentation::Settings.new(self)
  end

  def settings=(value)
    merged = data_settings.merge(value.to_h.stringify_keys)
    write_attribute(:settings, merged)
  end

  private

  def data_settings
    raw = self[:settings]
    raw.is_a?(Hash) ? raw.stringify_keys : {}
  end

  def finalist_count_must_be_positive
    raw = self[:settings]
    return unless raw.is_a?(Hash) && raw.key?("finalist_count")

    parsed = raw["finalist_count"].to_i
    return if parsed >= 1

    errors.add(:settings, :finalist_count_must_be_positive)
  end

  def sync_orgs_from_theme
    return unless theme.present? && orgs.empty?

    orgs << theme.orgs
  end
end
