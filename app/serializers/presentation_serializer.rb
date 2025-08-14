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
class PresentationSerializer < ApplicationSerializer
  object_as :presentation

  attributes(
    :name,
    :active,
    :theme_id,
  )
end
