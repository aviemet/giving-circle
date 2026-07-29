require "rails_helper"

RSpec.describe Searchable, type: :request do
  include Devise::Test::IntegrationHelpers

  it "searches and sorts theme orgs" do
    admin = create(:user)
    admin.confirm
    circle = create(:circle)
    admin.add_role(:super_admin)
    admin.add_role(:admin, circle)
    sign_in admin
    theme = create(:theme, circle: circle)
    create(:themes_org, theme:, org: create(:org, circle: theme.circle, name: "Alpha"))
    create(:themes_org, theme:, org: create(:org, circle: theme.circle, name: "Beta"))

    get theme_orgs_url(theme.circle, theme), params: { search: "Alpha", sort: "name", direction: "desc" }

    expect(response).to be_successful
  end

  it "resolves dotted association field types via a controller" do
    controller = ThemeOrgsController.new
    type = controller.send(:get_field_type, Org, "circle.name")
    expect(type).to eq(:string)
  end

  it "returns nil for unknown sort fields" do
    controller = ThemeOrgsController.new
    allow(controller).to receive(:params).and_return(ActionController::Parameters.new(sort: "missing"))
    expect(controller.send(:sort_string, Org)).to be_nil
  end

  it "defaults direction to asc" do
    controller = ThemeOrgsController.new
    allow(controller).to receive(:params).and_return(ActionController::Parameters.new(direction: "sideways"))
    expect(controller.send(:direction)).to eq("asc")
  end

  it "builds a sort string for valid fields" do
    controller = ThemeOrgsController.new
    allow(controller).to receive(:params).and_return(
      ActionController::Parameters.new(sort: "name", direction: "desc"),
    )
    expect(controller.send(:sort_string, Org)).to eq("name desc")
  end
end
