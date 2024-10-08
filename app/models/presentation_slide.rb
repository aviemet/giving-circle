# == Schema Information
#
# Table name: presentation_slides
#
#  id                       :uuid             not null, primary key
#  content                  :text
#  name                     :string
#  order                    :integer
#  slug                     :string           not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  presentation_id          :uuid
#  presentation_template_id :uuid
#
# Indexes
#
#  index_presentation_slides_on_presentation_id           (presentation_id)
#  index_presentation_slides_on_presentation_template_id  (presentation_template_id)
#  index_presentation_slides_on_slug                      (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (presentation_id => presentations.id)
#  fk_rails_...  (presentation_template_id => presentation_templates.id)
#
class PresentationSlide < ApplicationRecord
  include PgSearch::Model

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  pg_search_scope(
    :search,
    against: [:title, :content],
    associated_against: {
      presentation: [],
      template: [],
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  belongs_to :presentation, optional: true
  belongs_to :presentation_template, optional: true

  validates :presentation_template_id, presence: true, if: -> { presentation_id.nil? }
  validates :presentation_id, presence: true, if: -> { presentation_template_id.nil? }

  scope :includes_associated, -> { includes([:template, :presentation]) }
end
