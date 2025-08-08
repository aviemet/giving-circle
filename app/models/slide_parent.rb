# == Schema Information
#
# Table name: slide_parents
#
#  id              :uuid             not null, primary key
#  order           :integer
#  parentable_type :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  parentable_id   :uuid             not null
#  slide_id        :uuid             not null
#
# Indexes
#
#  index_slide_parents_on_parentable  (parentable_type,parentable_id)
#  index_slide_parents_on_slide_id    (slide_id)
#
# Foreign Keys
#
#  fk_rails_...  (slide_id => slides.id)
#
class SlideParent < ApplicationRecord
  include PgSearchable

  pg_search_config(
    associated_against: {
      slide: [], parentable: [],
    },
  )

  tracked # public_activity
  resourcify # rolify

  belongs_to :slide
  belongs_to :parentable, polymorphic: true

  scope :includes_associated, -> { includes([:slide, :parentable]) }
end
