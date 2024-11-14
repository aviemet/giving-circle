# == Schema Information
#
# Table name: contacts
#
#  id               :uuid             not null, primary key
#  contactable_type :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  contactable_id   :uuid             not null
#
# Indexes
#
#  index_contacts_on_contactable  (contactable_type,contactable_id)
#
class Contact < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:contactable],
    associated_against: {
      contactable: [],
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  belongs_to :contactable, polymorphic: true
  has_many :addresses, dependent: :delete_all
  has_many :emails, dependent: :delete_all
  has_many :phones, dependent: :delete_all
  has_many :websites, dependent: :delete_all

  accepts_nested_attributes_for :emails, reject_if: ->(attributes){ attributes['email'].blank? }, allow_destroy: true
  accepts_nested_attributes_for :addresses, reject_if: ->(attributes){ attributes['address'].blank? }, allow_destroy: true
  accepts_nested_attributes_for :phones, reject_if: ->(attributes){ attributes['number'].blank? }, allow_destroy: true
  accepts_nested_attributes_for :websites, reject_if: ->(attributes){ attributes['url'].blank? }, allow_destroy: true

  scope :includes_associated, -> { includes([:contactable]) }
end
