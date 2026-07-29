require "rails_helper"

RSpec.describe ThemeOrgsController, type: :controller do
  describe "private create helpers" do
    it "covers create_single_record success and failure paths" do
      circle = create(:circle)
      theme = create(:theme, circle: circle)
      controller = ThemeOrgsController.new
      without_partial_double_verification do
        allow(controller).to receive(:params).and_return(
          ActionController::Parameters.new(theme_slug: theme.slug, circle_slug: circle.slug),
        )
        allow(controller).to receive(:circle).and_return(circle)
        allow(controller).to receive(:org_params).and_return({ "name" => "Saved Org" })
        allow(controller).to receive(:circle_theme_orgs_path).and_return("/ok")
        allow(controller).to receive(:new_circle_theme_org_path).and_return("/new")
        allow(controller).to receive(:redirect_to)
        allow(controller).to receive(:t).and_return("notice")

        saved = build(:org, circle: circle, name: "Saved Org")
        allow(saved).to receive(:save).and_return(true)
        allow(Org).to receive(:new).and_return(saved)
        allow_any_instance_of(Theme).to receive_message_chain(:orgs, :<<)

        controller.send(:create_single_record)
        expect(controller).to have_received(:redirect_to).with("/ok", hash_including(:notice))

        failing = Org.new
        allow(failing).to receive(:save).and_return(false)
        allow(Org).to receive(:new).and_return(failing)

        expect {
          controller.send(:create_single_record)
        }.to raise_error(NameError)
      end
    end

    it "covers create_bulk_records success and failure paths" do
      circle = create(:circle)
      theme = create(:theme, circle: circle)
      controller = ThemeOrgsController.new
      without_partial_double_verification do
        allow(controller).to receive(:params).and_return(
          ActionController::Parameters.new(theme_slug: theme.slug, circle_slug: circle.slug),
        )
        allow(controller).to receive(:circle).and_return(circle)
        allow(controller).to receive(:ask_value).and_return(0)
        allow(controller).to receive(:orgs_params).and_return([{ "name" => "Bulk", "description" => "d" }])
        allow(controller).to receive(:circle_theme_orgs_path).and_return("/ok")
        allow(controller).to receive(:circle_theme_orgs_import_path).and_return("/import")
        allow(controller).to receive(:redirect_to)
        allow(controller).to receive(:t).and_return("notice")

        org_model = Org.new(name: "Bulk", circle: circle)
        association = double("themes_org")
        allow(association).to receive(:build)
        allow(org_model).to receive(:themes_org).and_return(association)
        allow(Org).to receive(:new).and_return(org_model)
        allow(Org).to receive(:import).and_return({ failed_instances: [] })

        controller.send(:create_bulk_records)
        expect(controller).to have_received(:redirect_to).with("/ok", hash_including(:notice))

        allow(Org).to receive(:import).and_return({ failed_instances: [Org.new] })
        controller.send(:create_bulk_records)
        expect(controller).to have_received(:redirect_to).with("/import", hash_including(inertia: { errors: "" }))
      end
    end

    it "maps orgs_params through strong params" do
      controller = ThemeOrgsController.new
      allow(controller).to receive(:params).and_return(
        ActionController::Parameters.new(
          orgs: [{ name: "One", ask: "10", description: "d", extra: "x" }],
        ),
      )

      mapped = controller.send(:orgs_params)
      expect(mapped).to eq([{ "name" => "One", "ask" => "10", "description" => "d" }])
    end
  end
end
