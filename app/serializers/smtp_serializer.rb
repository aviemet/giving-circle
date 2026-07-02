# == Schema Information
#
# Table name: smtps
#
#  id         :uuid             not null, primary key
#  address    :string
#  domain     :string
#  host       :string           not null
#  name       :string           not null
#  notes      :text
#  password   :string
#  port       :integer
#  security   :integer          default("plain")
#  username   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :uuid             not null
#
# Indexes
#
#  index_smtps_on_circle_id  (circle_id)
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
class SmtpSerializer < ApplicationSerializer
  object_as :smtp

  attributes(
    :name,
    :host,
    :port,
    :domain,
    :username,
    :password,
    :address,
    :security,
    :notes,
  )
end
