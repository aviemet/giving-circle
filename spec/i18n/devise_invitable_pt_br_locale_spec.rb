# frozen_string_literal: true

require "rails_helper"

RSpec.describe "devise_invitable pt-BR locale" do
	it "does not register a spurious pt_BR locale from the gem's mis-keyed YAML" do
		expect(I18n.available_locales).not_to include(:pt_BR)
		expect(I18n.available_locales).to include(:"pt-BR")
	end

	it "keeps devise_invitable invitation copy under pt-BR" do
		message = I18n.t(
			"devise.invitations.send_instructions",
			locale: :"pt-BR",
			email: "invitee@example.com",
		)

		expect(message).to include("invitee@example.com")
		expect(message).to match(/convite/i)
	end
end
