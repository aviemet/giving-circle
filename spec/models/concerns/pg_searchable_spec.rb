require "rails_helper"

RSpec.describe PgSearchable do
  it "supports dynamic and multi field search" do
    create(:org, name: "Searchable Org")

    expect(Org.dynamic_search("Searchable", :name)).to exist
    expect(Org.multi_field_search("Searchable", [:name, :description])).to exist
  end

  it "evaluates multisearch additional attributes for associations" do
    model = Class.new(ApplicationRecord) do
      self.table_name = "orgs"
      belongs_to :circle
      include PgSearchable
    end
    stub_const("PgSearchableOrg", model)

    captured = nil
    allow(PgSearchableOrg).to receive(:pg_search_scope)
    allow(PgSearchableOrg).to receive(:multisearchable) do |options|
      captured = options[:additional_attributes]
    end

    PgSearchableOrg.pg_search_config(
      against: [:name],
      associated_against: { circle: [:name] },
      enable_multisearch: true,
    )

    org = create(:org)
    expect(captured.call(org)).to include(circle_name: org.circle.name)

    allow(org).to receive(:circle).and_return(nil)
    expect(captured.call(org)).to eq({})
  end
end
