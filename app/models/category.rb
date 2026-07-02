# == Schema Information
#
# Table name: categories
#
#  id                 :uuid             not null, primary key
#  categorizable_type :string           not null
#  description        :text
#  name               :string           not null
#  slug               :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_categories_on_name_and_categorizable_type  (name,categorizable_type) UNIQUE
#  index_categories_on_slug                         (slug) UNIQUE
#
class Category < ApplicationRecord
  extend FriendlyId
  friendly_id :slug_candidate, use: :slugged

  include PgSearchable
  pg_search_config(against: [:name])

  tracked
  resourcify

  CATEGORIZABLE_TYPES = %w[Address Email Phone].freeze

  validates :name, presence: true, uniqueness: {
    scope: :categorizable_type,
    message: I18n.t("categories.validations.name_uniqueness"),
  }
  validates :categorizable_type, presence: true, inclusion: { in: CATEGORIZABLE_TYPES }

  scope :for_type, ->(type) { where(categorizable_type: type.to_s.singularize.camelize) }

  scope :includes_associated, -> { all }

  delegate :to_s, to: :category_with_type

  def category_with_type
    "#{categorizable_type} - #{name}"
  end

  def slug_candidate
    "#{categorizable_type}-#{name}"
  end

  def should_generate_new_friendly_id?
    name_changed? || categorizable_type_changed? || super
  end

  def records
    categorizable_type.constantize.where(category: self)
  end

  def qty
    records.count
  end
end
