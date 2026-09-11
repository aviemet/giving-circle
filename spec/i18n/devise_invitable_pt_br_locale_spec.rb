# frozen_string_literal: true

require "rails_helper"

RSpec.describe "devise_invitable pt-BR locale" do
  it "does not register a spurious pt_BR locale from the gem's mis-keyed YAML" do
    expect(I18n.available_locales).not_to include(:pt_BR)
  end
end
