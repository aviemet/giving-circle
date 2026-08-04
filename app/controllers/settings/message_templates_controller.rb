module Admin
  class Settings::MessageTemplatesController < Settings::CircleSettingsController
    include FriendlyIdHistory
    historical_slug_redirect_values MessageTemplate, :slug

    expose :message_templates, -> {
      search(circle.message_templates.includes_associated)
    }

    expose(
      :message_template,
      id: -> { params[:slug] },
      scope: -> { circle.message_templates.includes_associated },
      find: ->(slug, scope) { scope.friendly.find(slug) },
    )

    strong_params :message_template, permit: [
      :name,
      :medium,
      :subject,
      :body,
    ]

    sortable_fields %w(name slug medium)

    # @route GET /settings/:circle_slug/message_templates (settings_message_templates)
    def index
      paginated = paginate(message_templates, :message_templates)

      render inertia: "MessageTemplates/Index", props: {
        message_templates: -> { paginated.render(:index) },
        pagination: -> { {
          count: message_templates.size,
          **pagination_data(paginated)
        } },
        circle: -> { circle.render(:options) },
      }
    end

    # @route GET /settings/:circle_slug/message_templates/new (new_settings_message_template)
    def new
      render inertia: "MessageTemplates/New", props: {
        message_template: MessageTemplate.new(medium: "email", body: "").render(:form_data),
      }
    end

    # @route GET /settings/:circle_slug/message_templates/:slug/edit (edit_settings_message_template)
    def edit
      render inertia: "MessageTemplates/Edit", props: {
        message_template: message_template.render(:edit),
      }
    end

    # @route POST /settings/:circle_slug/message_templates (settings_message_templates)
    def create
      message_template.circle = circle

      if message_template.save
        redirect_to edit_settings_message_template_path(circle, message_template),
          notice: t("message_templates.notices.created")
      else
        redirect_to new_settings_message_template_path(circle),
          inertia: { errors: message_template.errors }
      end
    end

    # @route PATCH /settings/:circle_slug/message_templates/:slug (settings_message_template)
    # @route PUT /settings/:circle_slug/message_templates/:slug (settings_message_template)
    def update
      if message_template.update(message_template_params)
        redirect_to edit_settings_message_template_path(circle, message_template),
          notice: t("message_templates.notices.updated")
      else
        redirect_to edit_settings_message_template_path(circle, message_template),
          inertia: { errors: message_template.errors }
      end
    end

    # @route DELETE /settings/:circle_slug/message_templates/:slug (settings_message_template)
    def destroy
      message_template.destroy!
      redirect_to settings_message_templates_path(circle), notice: t("message_templates.notices.destroyed")
    end
  end
end
