# == Schema Information
#
# Table name: message_templates
#
#  id         :uuid             not null, primary key
#  body       :text             default(""), not null
#  medium     :string           not null
#  name       :string           not null
#  slug       :string           not null
#  subject    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :uuid             not null
#
# Indexes
#
#  index_message_templates_on_circle_id           (circle_id)
#  index_message_templates_on_circle_id_and_slug  (circle_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
class MessageTemplate < ApplicationRecord
  extend FriendlyId

  MEDIUMS = Integration::MEDIUMS

  friendly_id :name, use: [:slugged, :scoped], scope: :circle

  include PgSearchable
  pg_search_config(against: [:name, :slug, :subject, :body])

  resourcify

  belongs_to :circle
  has_many :presentation_messages, class_name: "Presentation::Message", dependent: :nullify
  has_many :templates_message_templates, dependent: :delete_all
  has_many :templates, through: :templates_message_templates

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: { scope: :circle_id }
  validates :medium, presence: true, inclusion: { in: MEDIUMS }
  validates :body, presence: true
  validates :subject, presence: true, if: -> { medium == "email" }

  attr_readonly :medium

  scope :includes_associated, -> { includes([:circle]) }

  def should_generate_new_friendly_id?
    name_changed? || super
  end
end
