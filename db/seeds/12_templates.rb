if Rails.env.development?
  circle = Circle.find_by!(slug: "battery-powered")

  Circle.transaction do
    if circle.message_templates.empty?
      circle.message_templates.create!({
        name: "Interact invitation",
        slug: "interact-invitation",
        medium: "email",
        subject: "Join #presentation.name - #circle.name",
        body: <<~HTML.squish,
          <p>Hi #membership.name,</p>
          <p>You are invited to participate in <strong>#presentation.name</strong> for #circle.name.</p>
          <p><a href="#interact_url">Open your interaction page</a></p>
        HTML
      })

      circle.message_templates.create!({
        name: "Interact invitation SMS",
        slug: "interact-invitation-sms",
        medium: "sms",
        body: "Hi #membership.name - join #presentation.name: #interact_url",
      })
    end

    if circle.templates.empty?
      interact_invitation = circle.message_templates.find_by!(slug: "interact-invitation")
      interact_invitation_sms = circle.message_templates.find_by!(slug: "interact-invitation-sms")

      template = FactoryBot.create(:template, name: "Allocation Night", circle:)
      template.message_templates = [interact_invitation, interact_invitation_sms]

      assets_dir = Rails.root.join("db/seeds/assets/allocation_night")
      slides_path = Rails.root.join("db/seeds/data/allocation_night_slides.json")

      attach_seed_blob = lambda do |filename, content_type, attach_to_circle: false|
        path = assets_dir.join(filename)
        blob = ActiveStorage::Blob.create_and_upload!(
          io: File.open(path),
          filename: filename,
          content_type: content_type,
        )

        if attach_to_circle
          attachment, = Circle::Fonts.find_or_attach!(circle, blob)
          blob = attachment.blob
        end

        Circle::Fonts.blob_redirect_url(blob.signed_id, filename)
      end

      asset_urls = {
        "Linotype - TradeGothicLTStd.otf" => attach_seed_blob.call("Linotype - TradeGothicLTStd.otf", "font/otf", attach_to_circle: true),
        "BentonModDisp Regular.TTF" => attach_seed_blob.call("BentonModDisp Regular.TTF", "font/ttf", attach_to_circle: true),
        "BPlogo_White.png" => attach_seed_blob.call("BPlogo_White.png", "image/png"),
      }

      resolve_seed_urls = lambda do |data|
        case data
        when Hash
          data.transform_values { |value| resolve_seed_urls.call(value) }
        when Array
          data.map { |value| resolve_seed_urls.call(value) }
        when String
          if data.start_with?("seed://")
            asset_urls.fetch(data.delete_prefix("seed://"))
          else
            data
          end
        else
          data
        end
      end

      JSON.parse(File.read(slides_path)).each_with_index do |slide_definition, index|
        slide = FactoryBot.create(:slide, {
          title: slide_definition.fetch("title"),
          data: resolve_seed_urls.call(slide_definition.fetch("data")),
        })

        FactoryBot.create(:slide_parent, {
          slide:,
          parentable: template,
          order: index + 1,
        })
      end
    end

    if InteractionUiTemplate.none?
      [
        { name: "Allocation", slug: "allocation" },
        { name: "Organization vote", slug: "org_vote" },
        { name: "Finalist vote", slug: "finalist_vote" },
        { name: "Pledges", slug: "pledges" },
      ].each do |attrs|
        InteractionUiTemplate.create!(attrs)
      end
    end

    if circle.interaction_config_templates.empty?
      allocation_ui = InteractionUiTemplate.find_by!(slug: "allocation")
      org_vote_ui = InteractionUiTemplate.find_by!(slug: "org_vote")
      finalist_vote_ui = InteractionUiTemplate.find_by!(slug: "finalist_vote")
      pledges_ui = InteractionUiTemplate.find_by!(slug: "pledges")

      circle.interaction_config_templates.create!({
        name: "Allocation round",
        slug: "allocation-round",
        interaction_ui_template: allocation_ui,
        config: {
          "fields" => [
            {
              "key" => "allocations",
              "type" => "org_money_map",
              "label" => "Allocate to organizations",
            },
          ],
          "outputs" => [
            {
              "metric" => "allocated_totals",
              "source_field" => "allocations",
              "reducer" => "sum_by_org",
            },
          ],
          "settings" => {},
        },
      })

      circle.interaction_config_templates.create!({
        name: "Org vote",
        slug: "org-vote",
        interaction_ui_template: org_vote_ui,
        config: {
          "fields" => [
            {
              "key" => "preferred_org",
              "type" => "org_reference",
              "label" => "Which organization do you support?",
            },
          ],
          "outputs" => [
            {
              "metric" => "vote_counts",
              "source_field" => "preferred_org",
              "reducer" => "count_by_value",
            },
          ],
          "settings" => {},
        },
      })

      circle.interaction_config_templates.create!({
        name: "Finalist vote",
        slug: "finalist-vote",
        interaction_ui_template: finalist_vote_ui,
        config: {
          "fields" => [
            {
              "key" => "votes",
              "type" => "org_money_map",
              "label" => "Cast your votes for organizations",
            },
          ],
          "outputs" => [
            {
              "metric" => "org_vote_totals",
              "source_field" => "votes",
              "reducer" => "sum_by_org",
            },
          ],
          "settings" => {
            "finalist_count" => 5,
            "default_votes" => 10,
          },
        },
      })

      circle.interaction_config_templates.create!({
        name: "Pledges",
        slug: "pledges",
        interaction_ui_template: pledges_ui,
        config: {
          "fields" => [
            {
              "key" => "pledges",
              "type" => "org_money_map",
              "label" => "Pledge to organizations",
            },
            {
              "key" => "anonymous",
              "type" => "boolean",
              "label" => "Anonymous",
            },
          ],
          "outputs" => [
            {
              "metric" => "allocated_totals",
              "source_field" => "pledges",
              "reducer" => "sum_by_org",
            },
          ],
          "settings" => {
            "allow_non_finalists" => false,
            "allow_over_ask" => false,
          },
        },
      })
    end
  end
end
