# == Schema Information
#
# Table name: slides
#
#  id              :uuid             not null, primary key
#  data            :jsonb
#  slug            :string
#  title           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  source_slide_id :uuid
#
# Indexes
#
#  index_slides_on_slug             (slug)
#  index_slides_on_source_slide_id  (source_slide_id)
#
# Foreign Keys
#
#  fk_rails_...  (source_slide_id => slides.id)
#
FactoryBot.define do
  factory :slide do
    title { Faker::Book.title }
    data { {
      content: {},
      root: {},
      zones: {},
    } }
  end
end
