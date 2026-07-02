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
FactoryBot.define do
  factory :smtp do
    circle
    name { "Primary SMTP" }
    host { "smtp.example.com" }
    port { 587 }
    domain { "example.com" }
    username { "mailer" }
    password { "secret" }
    security { :tls }
  end
end
