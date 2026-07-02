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
require "rails_helper"

RSpec.describe Smtp do
  describe "Validations" do
    subject { build(:smtp) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:host) }
  end

  describe "Enums" do
    subject(:smtp) { build(:smtp) }

    it {
      expect(smtp).to define_enum_for(:security)
        .with_values(plain: 0, tls: 1, ssl: 2)
        .backed_by_column_of_type(:integer)
    }
  end
end
