# spec/models/address_spec.rb

require 'rails_helper'
require 'models/shared/contact_method'

RSpec.describe Address do
  describe "Associations" do
    it_behaves_like "contact_method"
  end
end
