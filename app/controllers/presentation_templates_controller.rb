class PresentationTemplatesController < ApplicationController
  include Searchable

  expose :templates, -> { search(PresentationTemplate.includes_associated, sortable_fields) }
  expose :template, find: ->(id, scope){ scope.includes_associated.find(id) }

  # @route GET /circles/:circle_slug/presentation_templates (circle_presentation_templates)
  def index
    authorize templates

    paginated_templates = templates.page(params[:page] || 1).per(current_user.limit(:items))

    render inertia: "Templates/Index", props: {
      templates: -> { paginated_templates.render(view: :index) },
      pagination: -> { {
        count: templates.size,
        **pagination_data(paginated_templates)
      } },
      circle: -> { Circle.find_by(slug: params[:circle_slug]).render(view: :options) },
    }
  end

  # @route GET /presentation_templates/:id (presentation_template)
  def show
    authorize template
    render inertia: "Templates/Show", props: {
      template: -> { template.render(view: :show) }
    }
  end

  # @route GET /circles/:circle_slug/presentation_templates/new (new_circle_presentation_template)
  def new
    authorize PresentationTemplate.new
    render inertia: "Templates/New", props: {
      template: PresentationTemplate.new.render(view: :form_data),
      circle: -> { Circle.find_by(slug: params[:circle_slug]).render(view: :options) },
    }
  end

  # @route GET /presentation_templates/:id/edit (edit_presentation_template)
  def edit
    authorize template
    render inertia: "Templates/Edit", props: {
      template: template.render(view: :edit)
    }
  end

  # @route POST /circles/:circle_slug/presentation_templates (circle_presentation_templates)
  def create
    authorize PresentationTemplate.new
    if template.save
      redirect_to template, notice: "Template was successfully created."
    else
      redirect_to new_template_path, inertia: { errors: template.errors }
    end
  end

  # @route PATCH /presentation_templates/:id (presentation_template)
  # @route PUT /presentation_templates/:id (presentation_template)
  def update
    authorize template
    if template.update(template_params)
      redirect_to template, notice: "Template was successfully updated."
    else
      redirect_to edit_template_path, inertia: { errors: template.errors }
    end
  end

  # @route DELETE /circles/:circle_slug/presentation_templates (circle_presentation_templates)
  # @route DELETE /presentation_templates/:id (presentation_template)
  def destroy
    authorize template
    template.destroy!
    redirect_to templates_url, notice: "Template was successfully destroyed."
  end

  private

  def sortable_fields
    %w(name).freeze
  end

  def template_params
    params.require(:template).permit(:name)
  end
end
