require "rails_helper"

RSpec.describe Messaging::RecipientsResolver do
  it "skips members who responded to the configured interaction" do
    presentation = create(:presentation)
    membership = create(:membership, circle: presentation.circle)
    other = create(:membership, circle: presentation.circle, name: "Other")
    create(:presentations_membership, presentation: presentation, membership: membership)
    create(:presentations_membership, presentation: presentation, membership: other)
    user = create(:user, person: membership.person, email: "member@example.com")
    create(:user, person: other.person, email: "other@example.com")

    interaction = create(:presentation_interaction, presentation: presentation)
    create(:presentation_interaction_response, presentation_interaction: interaction, membership: membership)

    message = create(
      :presentation_message,
      presentation: presentation,
      skip_interaction: interaction,
      medium: "email",
    )

    result = described_class.new(presentation_message: message).call

    expect(result.skipped.map(&:membership_id)).to include(membership.id.to_s)
    expect(result.recipients.map(&:membership_id)).to include(other.id.to_s)
    expect(result.recipients.map(&:to)).to include("other@example.com")
    expect(user.email).to eq("member@example.com")
  end

  it "limits recipients when membership_ids are passed at send time" do
    presentation = create(:presentation)
    membership = create(:membership, circle: presentation.circle)
    other = create(:membership, circle: presentation.circle, name: "Other")
    create(:presentations_membership, presentation: presentation, membership: membership)
    create(:presentations_membership, presentation: presentation, membership: other)
    create(:user, person: membership.person, email: "member@example.com")
    create(:user, person: other.person, email: "other@example.com")

    message = create(:presentation_message, presentation: presentation, medium: "email")

    result = described_class.new(
      presentation_message: message,
      membership_ids: [membership.id],
    ).call

    expect(result.recipients.map(&:membership_id)).to eq([membership.id.to_s])
    expect(result.skipped).to be_empty
  end

  it "resolves no recipients when membership_ids is an empty list" do
    presentation = create(:presentation)
    membership = create(:membership, circle: presentation.circle)
    create(:presentations_membership, presentation: presentation, membership: membership)
    create(:user, person: membership.person, email: "member@example.com")

    message = create(:presentation_message, presentation: presentation, medium: "email")

    result = described_class.new(
      presentation_message: message,
      membership_ids: [],
    ).call

    expect(result.recipients).to be_empty
    expect(result.skipped).to be_empty
  end
end
