class TemplatesController < ApplicationController
  include Searchable

  expose :templates, -> { search(Template.includes_associated, sortable_fields) }
    expose :template, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  # GET /templates
  def index
    authorize templates

    paginated_%= plural_table_name %> = %= plural_table_name %>.page(params[:page] || 1).per(current_user.limit(:items))

    render inertia: "Templates/Index", props: {
      templates: -> { templates.render(view: :index) }
    }
  end

  # GET /templates/:id
  def show
    authorize template
    render inertia: "Templates/Show", props: {
      template: -> { template.render(view: :show) }
    }
  end

  # GET /templates/new
  def new
    authorize Template.new
    render inertia: "Templates/New", props: {
      template: Template.new.render(view: :new)
    }
  end

  # GET /templates/:id/edit
  def edit
    authorize template
    render inertia: "Templates/Edit", props: {
      template: template.render(view: :edit)
    }
  end

  # POST /templates
  def create
    authorize Template.new
    if template.save
      redirect_to template, notice: "Template was successfully created."
    else
      redirect_to new_template_path, inertia: { errors: template.errors }
    end
  end

  # PATCH/PUT /templates/:id
  def update
    authorize template
    if template.update(template_params)
      redirect_to template, notice: "Template was successfully updated."
    else
      redirect_to edit_template_path, inertia: { errors: template.errors }
    end
  end

  # DELETE /templates/:id
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
