# == Schema Information
#
# Table name: presentations_orgs
#
#  id              :bigint           not null, primary key
#  presentation_id :bigint           not null
#  org_id          :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe PresentationsOrg, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
