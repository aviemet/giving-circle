# frozen_string_literal: true

require "rails_helper"

RSpec.describe "I18n.available_locales" do
  it "only enables locales the app ships" do
    expect(I18n.available_locales).to eq([:en])
  end
end
