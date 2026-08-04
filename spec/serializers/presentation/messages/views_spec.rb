require "rails_helper"

RSpec.describe "Presentation message serializers" do
  let(:presentation) { create(:presentation) }

  def payload(result)
    result.with_indifferent_access
  end

  it "renders form_data for an unsaved message" do
    message = Presentation::Message.new(
      presentation: presentation,
      medium: "email",
      body: "",
      status: "ready",
    )

    data = payload(Presentation::Messages::FormDataSerializer.one(message))

    expect(data[:medium]).to eq("email")
    expect(data[:status]).to eq("ready")
    expect(data[:delivery_results]).to eq({})
    expect(data[:mediums]).to eq(Presentation::Message::MEDIUMS)
    expect(data[:integrations]).to be_an(Array)
    expect(data[:message_templates]).to be_an(Array)
    expect(data[:interactions]).to be_an(Array)
  end

  it "renders form_data for a message built from a template" do
    template = create(:message_template, circle: presentation.circle)
    message = Presentation::Message.new(
      presentation: presentation,
      message_template: template,
      name: template.name,
      medium: template.medium,
      subject: template.subject,
      body: template.body,
      status: "ready",
    )

    data = payload(Presentation::Messages::FormDataSerializer.one(message))

    expect(data[:name]).to eq(template.name)
    expect(data[:body]).to eq(template.body)
    expect(data[:delivery_results]).to eq({})
  end

  it "renders index edit and form_data for a persisted message" do
    message = create(:presentation_message, presentation: presentation)

    index_data = payload(Presentation::Messages::IndexSerializer.one(message))
    edit_data = payload(Presentation::Messages::EditSerializer.one(message))
    form_data = payload(Presentation::Messages::FormDataSerializer.one(message))
    persisted_data = payload(Presentation::Messages::PersistedSerializer.one(message))

    expect(index_data[:slug]).to eq(message.slug)
    expect(index_data[:delivery_results]).to eq({})

    expect(edit_data[:id]).to eq(message.id)
    expect(edit_data[:slug]).to eq(message.slug)
    expect(edit_data[:integrations]).to be_an(Array)

    expect(form_data[:name]).to eq(message.name)
    expect(form_data[:delivery_results]).to eq({})

    expect(persisted_data[:id]).to eq(message.id)
    expect(persisted_data[:slug]).to eq(message.slug)
  end
end
