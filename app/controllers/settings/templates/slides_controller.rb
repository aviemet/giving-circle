module Admin
  class Settings::Templates::SlidesController < Settings::CircleSettingsController
    expose :template, id: -> { params[:template_slug] }, scope: -> { circle.templates.includes_associated }, find_by: :slug

    expose :slides, -> { template.slides.includes_associated }
    expose :slide, id: -> { params[:slug] }, scope: -> { template.slides }, find_by: :slug

    strong_params :slide, permit: [:name, :data]

    sortable_fields %w(name)

    # @route GET /settings/:circle_slug/templates/:template_slug/slides/:slug/edit (settings_templates_edit_slide)
    def edit
      render inertia: "Templates/Slides/Edit", props: {
        template: template.render(:persisted),
        slide: slide.render(:form_data)
      }
    end

    # @route POST /settings/:circle_slug/templates/:template_slug/slides (settings_templates_create_slide)
    def create
      if slide.save
        redirect_to settings_templates_edit_slide_path(circle, template, slide), notice: t("slides.notices.created")
      else
        redirect_to settings_templates_edit_slide_path(circle, template, slide), inertia: { errors: slide.errors }
      end
    end
  end
end
