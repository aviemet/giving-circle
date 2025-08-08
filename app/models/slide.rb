# == Schema Information
#
# Table name: slides
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  slug       :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Slide < ApplicationRecord
  include PgSearchable

  extend FriendlyId

  friendly_id :title, use: [:slugged, :history]

  def should_generate_new_friendly_id?
    title_changed? || super
  end

  pg_search_config(against: [:title, :data, :slug])

  tracked # public_activity
  resourcify # rolify

  has_many :slide_parents, dependent: :destroy
  has_many :templates, through: :slide_parents, source: :parentable, source_type: "Template"
  has_many :presentations, through: :slide_parents, source: :parentable, source_type: "Presentation"

  scope :includes_associated, -> { includes([:slide_parents, :templates, :presentations]) }
end
