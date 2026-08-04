require "rails_helper"

RSpec.describe Messaging::Renderer do
  include Rails.application.routes.url_helpers

  it "renders member and absolute interact url hash tags" do
    presentation = create(:presentation)
    membership = create(:membership, circle: presentation.circle, name: "Alex Member")
    create(:presentations_membership, presentation: presentation, membership: membership)

    rendered = described_class.new(presentation: presentation, membership: membership).render(
      "Hi #membership.name #interact_url",
    )

    expect(rendered).to include("Alex Member")
    expect(rendered).to include(
      circle_presentation_interact_url(
        circle_slug: presentation.circle.slug,
        presentation_slug: presentation.slug,
      ),
    )
  end

  it "renders hash tags inside HTML without disturbing markup" do
    presentation = create(:presentation)
    membership = create(:membership, circle: presentation.circle, name: "Alex Member")
    create(:presentations_membership, presentation: presentation, membership: membership)

    rendered = described_class.new(presentation: presentation, membership: membership).render(
      "<p>Hi <strong>#membership.name</strong></p><p><a href=\"#interact_url\">Open</a></p>",
    )

    expect(rendered).to include("<strong>Alex Member</strong>")
    expect(rendered).to include(
      "href=\"#{circle_presentation_interact_url(
        circle_slug: presentation.circle.slug,
        presentation_slug: presentation.slug,
      )}\"",
    )
  end
end
