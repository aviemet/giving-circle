# == Schema Information
#
# Table name: emails
#
#  id         :bigint           not null, primary key
#  email      :string
#  contact_id :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Email < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:email],
    associated_against: {
      contact: [],
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  belongs_to :contact

  scope :includes_associated, -> { includes([:contact]) }
end
