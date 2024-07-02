# == Schema Information
#
# Table name: presentation_slides
#
#  id                       :bigint           not null, primary key
#  content                  :text
#  order                    :integer
#  title                    :string
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  presentation_id          :bigint
#  presentation_template_id :bigint
#
# Indexes
#
#  index_presentation_slides_on_presentation_id           (presentation_id)
#  index_presentation_slides_on_presentation_template_id  (presentation_template_id)
#
# Foreign Keys
#
#  fk_rails_...  (presentation_id => presentations.id)
#  fk_rails_...  (presentation_template_id => presentation_templates.id)
#
class PresentationSlide < ApplicationRecord
  include PgSearch::Model

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

  belongs_to :presentation
  belongs_to :presentation_template

  validates :presentation_template_id, presence: true, if: -> { presentation_id.nil? }
  validates :presentation_id, presence: true, if: -> { presentation_template_id.nil? }

  scope :includes_associated, -> { includes([:template, :presentation]) }
end
